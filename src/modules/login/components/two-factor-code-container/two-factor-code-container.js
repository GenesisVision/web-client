import { NOT_FOUND_PAGE_ROUTE } from "pages/not-found/not-found";
import React, { Component } from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";

import { TWO_FACTOR_CODE } from "../../login.constants";
import loginService from "../../service/login-service";
import TwoFactorCodeForm from "./two-factor-code-form/two-factor-code-form";

class TwoFactorCodeContainer extends Component {
  componentDidMount() {
    console.info(this.props);
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
      <TwoFactorCodeForm
        onSubmit={this.handleSubmit}
        error={this.props.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return { errorMessage };
};

const mapDispatchToProps = dispatch => ({
  twoFactorLogin: (code, setSubmitting) => {
    const onCatch = () => {
      setSubmitting(false);
    };
    dispatch(loginService.twoFactorLogin(code, TWO_FACTOR_CODE, onCatch));
  },
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
  clearLoginData: () => {
    dispatch(loginService.clearLoginData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorCodeContainer);
