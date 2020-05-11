import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { ConnectedDashboard } from '../Dashboard/Dashboard'
import { ConnectedLogin } from '../Login/Login'
import { ConnectedSignUp } from '../SignUp/SignUp'
import { Router, Route } from 'react-router-dom'
import { history } from '../../store/history'
import { ConnectedNavigation } from '../Navigation/Navigation'
import { ConnectTaskDetail } from '../TaskDetail/TaskDetail'
import { Redirect } from 'react-router'

import './Main.scss'
const RouteGuard = (Component) => ({ match }) => {
  console.info('Route guard', match)
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />
  } else return <Component match={match} />
}

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div className="Main-app">
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin} />
        <Route exact path="/signup" component={ConnectedSignUp} />
        <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
        <Route exact path="/task/:id" render={RouteGuard(ConnectTaskDetail)} />
      </div>
    </Provider>
  </Router>
)
