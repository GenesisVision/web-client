import { connect } from 'react-redux'
import React from 'react'

import loginActions from '../../actions/loginActions'
import LoginForm from './LoginForm/LoginForm'
import routes from '../../utils/constants/routes'
import authActions from '../../actions/authActions'

const LoginScene = ({ location, isAuthenticated, isPending, errorMessage, login, alreadyAuthenticated }) => {
  
  if(isAuthenticated){
    alreadyAuthenticated();
    return null;
  }

  const { from } = location.state || { from: { pathname: routes.index } }
  const handleSubmit = (user) => {
    login(user, from);
  }

  return (
      <LoginForm onSubmit={handleSubmit} />
  )
}

const mapStateToProps = (state) => {
  const { isPending, errorMessage } = state.loginData;  
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, isPending, errorMessage };
}

const mapDispatchToProps = (dispatch) => ({
  login: ({ username, password }, from) => {
    dispatch(loginActions.loginUser({ username, password }, from));
  },
  alreadyAuthenticated: () => {
    dispatch(authActions.alreadyAuthenticated());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScene)
