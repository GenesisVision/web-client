import React from 'react'
import { connect } from 'react-redux'
import Login from './Login/Login'

const mapStateToProps = state => ({
  auth: state.auth
})

const LoginScene = props => {
  if (props.auth.isFetching) {
    return (null);
  }

  return (
    <Login auth={props.auth} dispatch={props.dispatch} />
  );
}

export default connect(
  mapStateToProps
)(LoginScene)
