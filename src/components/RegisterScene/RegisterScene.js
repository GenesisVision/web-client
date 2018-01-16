import { connect } from 'react-redux'
import React from 'react'

import { registerActions } from '../../actions/registerActions/registerActions'
import RegisterForm from './RegisterForm/RegisterForm'
import authActions from '../../actions/authActions'

const RegisterScene = ({ isAuthenticated, isPending, errorMessage, register, alreadyAuthenticated }) => {

  if (isAuthenticated) {
    alreadyAuthenticated();
    return null;
  }

  const handleSubmit = (user) => {
    register(user);
  }

  return (
    <RegisterForm onSubmit={handleSubmit} />
  )
}

const mapStateToProps = (state) => {
  const { isPending, errorMessage } = state.registerData;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, isPending, errorMessage };
}

const mapDispatchToProps = (dispatch) => ({
  register: (user) => {
    dispatch(registerActions.registerUser(user));
  },
  alreadyAuthenticated: () => {
    dispatch(authActions.alreadyAuthenticated());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScene)
