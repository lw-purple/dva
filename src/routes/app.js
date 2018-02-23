import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Layout, Loader } from 'components';
import { BackTop } from 'antd';
import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';
import { withRouter } from 'dva/router';
import '../themes/index.less';
import './app.less'
import Error from './error';

const { prefix, openPages } = config;

const { Header } = Layout;
let lastHref;
const App = ({ children, dispatch, app, loading, location }) => {
    console.log(arguments)
    // const { user,siderFold,darkTheme,isNavVar,}
    const { iconFontJS, iconFontCSS, logo } = config

    // if (lastHref !== href) {
    //     NProgress.start()
    //     if (!loading.global) {
    //         NProgress.done()
    //         lastHref = href
    //     }
    // }

    const headerProps = {
        // menu,
        switchMenuPopover() {
            dispatch({ type: 'app/switchMenuPopver' })
        }
    }

    // const siderProps = {
    //     menu
    // }

    // if (openPages && openPages.includes(pathname)) {
    //     return (
    //         <div>
    //             <Loader fullScreen spinning={loading.effects['app/query']} />
    //             {children}
    //         </div>
    //     )
    // }
    return (
        <div>
            {/* <Loader fullScreen spinning={loading.effects['app/query']} /> */}
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
export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))