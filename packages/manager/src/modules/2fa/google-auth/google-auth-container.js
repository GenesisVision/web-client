import "./google-auth.scss";

import GoogleAuthCodes from "modules/2fa/google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "modules/2fa/google-auth/google-auth-steps/google-auth-steps";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { authApiProxy } from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import * as twoFactorServices from "../services/2fa.service.js";

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
    this.props.service
      .confirm2fa({
        ...values,
        sharedKey
      })
      .then(data => {
        this.setState({ ...data }, this.props.onSubmit);
      })
      .catch(data => {
        this.setState({ ...data });
      });
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

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(twoFactorServices, dispatch)
});

export default compose(translate(), connect(null, mapDispatchToProps))(
  GoogleAuthContainer
);
