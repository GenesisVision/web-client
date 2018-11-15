import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";

import { RECOVERY_CODE } from "../../actions/login.actions";
import { clearLoginData, twoFactorLogin } from "../../services/login.service";
import RecoveryCodeForm from "./recovery-code-form";

class RecoveryCodeContainer extends Component {
  componentDidMount() {
    const { email, password, showNotFoundPage } = this.props;
    if (email === "" || password === "") {
      showNotFoundPage();
    }
  }

  componentWillUnmount() {
    this.props.clearLoginData();
  }

  handleSubmit = (recoveryCode, setSubmitting) => {
    this.props.twoFactorLogin(recoveryCode, setSubmitting);
  };

  render() {
    return (
      <RecoveryCodeForm
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
  twoFactorLogin: (code, setSubmitting) => {
    dispatch(twoFactorLogin(code, RECOVERY_CODE, setSubmitting));
  },
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
  clearLoginData: () => {
    dispatch(clearLoginData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RecoveryCodeContainer
);
