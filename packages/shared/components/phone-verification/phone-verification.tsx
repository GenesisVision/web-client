import * as React from "react";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import PhoneVerificationForm from "./phone-verification-form";
import { Nullable } from "shared/utils/types";

interface IPhoneVerificationProps {
  phoneNumber: string;
  onVerify?(): void;
}

interface IPhoneVerificationState {
  errorMessage: Nullable<string>;
  data: number;
  disabledResend: boolean;
}

class PhoneVerification extends React.Component<
  IPhoneVerificationProps,
  IPhoneVerificationState
> {
  state = {
    errorMessage: null,
    data: 0,
    disabledResend: false
  };
  timeout: any;

  sendCode = () => {
    authApi
      .v10AuthPhoneCodePost(authService.getAuthArg())
      .then(data => this.setState({ data }))
      .catch(data => this.setState({ data }));
  };

  verifyCode = (code: string) => {
    authApi
      .v10AuthPhoneVerifyPost(authService.getAuthArg(), {
        code
      })
      .then(() => {
        if (this.props.onVerify) {
          this.props.onVerify();
        }
      })
      .catch(data => this.setState({ data }));
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

export default PhoneVerification;
