import React, { Component } from "react";
import { connect } from "react-redux";

import loginService from "../../service/login-service";
import LoginForm from "./login-form";

class LoginContainer extends Component {
  componentWillUnmount() {
    this.props.clearLoginData();
  }
  handleSubmit = (loginFormData, setSubmitting) => {
    this.props.login(loginFormData, this.props.from, setSubmitting);
  };
  render() {
    const { errorMessage } = this.props;
    return <LoginForm onSubmit={this.handleSubmit} error={errorMessage} />;
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.loginData.login;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  login: (loginFormData, from, setSubmitting) => {
    const onCatch = () => {
      setSubmitting(false);
    };
    dispatch(loginService.login(loginFormData, from, onCatch));
  },
  clearLoginData: () => {
    dispatch(loginService.clearLoginData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
