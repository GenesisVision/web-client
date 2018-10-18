import PropTypes from "prop-types";
import React, { Component } from "react";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

import PhoneVerificationForm from "./phone-verification-form";

class PhoneVerification extends Component {
  state = {
    errorMessage: null,
    data: 0,
    disabledResend: false
  };

  sendCode = () => {
    authApiProxy
      .v10AuthPhoneCodePost(authService.getAuthArg())
      .then(data => this.setState({ ...data }))
      .catch(data => this.setState({ ...data }));
  };

  verifyCode = code => {
    authApiProxy
      .v10AuthPhoneVerifyPost(authService.getAuthArg(), {
        code
      })
      .then(() => {
        if (this.props.onVerify) {
          this.props.onVerify();
        }
      })
      .catch(data => this.setState({ ...data }));
  };

  startTimer() {
    clearTimeout(this.timeout);
    if (this.state.data > 0) {
      this.timeout = setTimeout(() => {
        this.setState({ data: this.state.data - 1 });
      }, 1000);
    }
  }

  componentDidUpdate() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <PhoneVerificationForm
        phoneNumber={this.props.phoneNumber}
        onResendClick={this.sendCode}
        onSubmit={this.verifyCode}
        errorMessage={this.state.errorMessage}
        disabledResend={this.state.data > 0}
      />
    );
  }
}

PhoneVerification.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  onVerify: PropTypes.func
};

export default PhoneVerification;
