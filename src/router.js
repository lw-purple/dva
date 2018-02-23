import React from 'react';
import PropTypes, { func } from 'prop-types';
import { routerRedux, Route, Switch,Redirect  } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from 'routes/app';

const { ConnectedRouter } = routerRedux;

const Routers = function({history,app}){
  const error = dynamic({
    app,
    component:()=>import('./routes/error'),
  })

  const routes =[
    {
      path: '/dashboard',
      // models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }
  ]
  
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}
Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
