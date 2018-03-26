import { connect } from "react-redux";
import React from "react";

import LoginForm from "./login-form/login-form";
import loginService from "../service/login-service";

import { HOME_ROUTE } from "../../../components/app.constants";

const LoginContainer = ({ location, isAuthenticated, errorMessage, login }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  const handleSubmit = (loginFormData, setSubmitting) => {
    login(loginFormData, from, setSubmitting);
  };

  return <LoginForm onSubmit={handleSubmit} error={errorMessage} />;
};

const mapStateToProps = state => {
  const { errorMessage } = state.loginData;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  login: (loginFormData, from, setSubmitting) => {
    dispatch(loginService.login(loginFormData, from)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
