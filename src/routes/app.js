import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Layout, Loader } from 'components';
import { BackTop } from 'antd';
import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';//页面共同header
import { withRouter } from 'dva/router';
import '../themes/index.less';
import './app.less'
import Error from './error';

const { prefix, openPages } = config;

const { Header } = Layout;
let lastHref;
const App = ({ children, dispatch, app, loading, location }) => {
    const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions } = app;
    let { pathname } = location;
    const { iconFontJS, iconFontCSS, logo } = config
    const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname));
    const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false;
    
    const href = window.location.href;
    if (lastHref !== href) {
        NProgress.start()
        if (!loading.global) {
            NProgress.done()
            lastHref = href
        }
    }

    const headerProps = {
        menu,
        user,
        location,
        siderFold,
        isNavbar,
        menuPopoverVisible,
        navOpenKeys,
        switchMenuPopover() {
            dispatch({ type: 'app/switchMenuPopver' })
        },
        logout() {
            dispatch({ type: 'app/logout' })
        },
        switchSider() {
            dispatch({type:'app/swithSider'})
        },
        changeOpenKeys(openKeys){
            dispatch({type:'app/handleNavOpenKeys',payload:{navOpenKeys:openKeys}});
        }
    }

    const siderProps = {
        menu,
        location,
        siderFold,
        darkTheme,
        navOpenKeys,
        changeTheme(){
            dispatch({type:'app/switchTheme'})
        },
        changeOpenKeys(openKeys){
            window.localStorage.setItem(`${prefix}navOpenKeys`,JSON.stringify(openKeys));
            dispatch({type:'app/handleNavOpenKeys',payload:{navOpenKeys:openKeys}})
        }
    }

    const breadProps = {
        menu,
        location
    }

    if (openPages && openPages.includes(pathname)) {
        return (
            <div>
                <Loader fullScreen spinning={loading.effects['app/query']} />
                {children}
            </div>
        )
    }
    return (
        <div>
            <Loader fullScreen spinning={loading.effects['app/query']} />
            <Helmet>
                <title>设享云</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href={logo} type="image/x-icon" />
                {iconFontJS && <script src={iconFontJS} />}
                {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
            </Helmet>
            <Header {...headerProps} />
        </div>
    )
}

App.PropTypes = {
    children:PropTypes.element.isRequired,
    location:PropTypes.object,
    dispatch:PropTypes.func,
    app:PropTypes.object,
    loading:PropTypes.object
}
export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))