import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoginForm from "./login-form";

class LoginFormContainer extends Component {
  componentWillUnmount() {
    this.props.service.clearLoginData();
  }
  handleSubmit = (loginFormData, setSubmitting) => {
    this.props.service.login(loginFormData, this.props.from, setSubmitting);
  };
  render() {
    const { errorMessage, FORGOT_PASSWORD_ROUTE } = this.props;
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        error={errorMessage}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.loginData.login;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, errorMessage };
};

const mapDispatchToProps = (dispatch, props) => ({
  service: bindActionCreators(props.loginService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
