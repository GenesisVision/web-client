import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found";
import { replace } from "react-router-redux";
import React, { Component } from "react";

import TwoFactorForm from "./two-factor-form/two-factor-form";
import loginService from "../../service/login-service";

class TwoFactorContainer extends Component {
  componentDidMount() {
    const { email, password, showNotFoundPage } = this.props;
    if (email === "" || password === "") {
      showNotFoundPage();
    }
  }

  componentWillUnmount() {
    this.props.clearLoginData();
  }

  handleSubmit = (twoFactor, setSubmitting) => {
    this.props.twoFactorLogin(twoFactor, setSubmitting);
  };

  render() {
    return (
      <TwoFactorForm
        onSubmit={this.handleSubmit}
        error={this.props.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return { errorMessage, email, password };
};

const mapDispatchToProps = dispatch => ({
  twoFactorLogin: (twoFactor, setSubmitting) => {
    const onCatch = () => {
      setSubmitting(false);
    };
    dispatch(loginService.twoFactorLogin(twoFactor, "twoFactorCode", onCatch));
  },
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
  clearLoginData: () => {
    dispatch(loginService.clearLoginData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorContainer);
