import "./google-auth.scss";

import GoogleAuthCodes from "modules/2fa/google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "modules/2fa/google-auth/google-auth-steps/google-auth-steps";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

class GoogleAuthContainer extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    authApiProxy.v10Auth2faCreatePost(authService.getAuthArg()).then(data => {
      this.setState({ ...data });
    });
  }

  handleSubmit = values => {
    if (!this.state.data) return;
    const { sharedKey } = this.state.data;

    this.setState({ isPending: true });
    authApiProxy
      .v10Auth2faConfirmPost(authService.getAuthArg(), {
        model: {
          ...values,
          sharedKey
        }
      })
      .then(data => this.setState({ ...data }, this.props.onSubmit))
      .catch(data => this.setState({ ...data }));
  };

  render() {
    if (!this.state.data) return null;
    const { authenticatorUri, sharedKey, codes } = this.state.data;
    return !codes ? (
      <GoogleAuthStepsContainer
        authenticatorUri={authenticatorUri}
        sharedKey={sharedKey}
        onSubmit={this.handleSubmit}
        disabled={this.state.isPending}
        errorMessage={this.state.errorMessage}
      />
    ) : (
      <GoogleAuthCodes codes={codes} />
    );
  }
}

export default translate()(GoogleAuthContainer);
