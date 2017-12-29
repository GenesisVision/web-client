import { Redirect, Route } from 'react-router-dom'

import React from 'react'
import { isAuthenticated } from '../../services/authService'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

export default PrivateRoute
