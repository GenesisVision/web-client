import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import authService from '../../services/authService'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      authService.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  )
}

export default PrivateRoute
