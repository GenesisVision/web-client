import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import React from 'react'
import { connect } from 'react-redux'
import routes from '../../../../utils/constants/routes'

const AuthButtons = ({ match, isAuthenticated }) => {
  
  const authRoutes = [routes.login, routes.signup];
  if (authRoutes.some(x=> match.url.match(x))) {
    return null;
  }

  if (isAuthenticated) {
    return (<LogoutButton />);
  }
  return (<LoginButton />)
}

const mapStateToProps = (state) => {
  const { authData } = state;
  const { isAuthenticated } = authData;
  
  return {
    isAuthenticated
  }
}

export default connect(
  mapStateToProps
)(AuthButtons)

