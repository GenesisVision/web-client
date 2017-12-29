import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import React from 'react'
import { logoutUser } from '../../../../actions/auth/logoutActions'

const AuthButtons = ({ dispatch, auth, match }) => {

  const onLogoutClick = () => {
    dispatch(logoutUser());
  }
  
  if (match.url.match('/login')) {
    return null;
  }
  if (auth.isAuthenticated) {
    return (<LogoutButton onLogoutClick={onLogoutClick} />);
  }
  return (<LoginButton />)

}

export default AuthButtons
