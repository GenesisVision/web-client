import "./google-auth.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import GoogleAuthCodes from "../google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "../google-auth/google-auth-steps/google-auth-steps";
import * as twoFactorServices from "../services/2fa.service.js";
import DialogLoaderGoogleAuthSteps from "./google-auth-steps/dialog-loader-google-auth-steps";

class GoogleAuthContainer extends Component {
  state = {
    data: null,
    errorMessage: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    authApi.v10Auth2faCreatePost(authService.getAuthArg()).then(data => {
      this.setState({ data, isPending: false });
    });
  }

  handleSubmit = (values, setSubmitting) => {
    if (!this.state.data) return;
    const { sharedKey } = this.state.data;

    this.props.service
      .confirm2fa({
        ...values,
        sharedKey
      })
      .then(data => {
        this.setState({ data });
        this.props.onSubmit();
      })
      .catch(data => {
        this.setState({ errorMessage: data.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    if (!this.state.data) return <DialogLoaderGoogleAuthSteps />;
    const { authenticatorUri, sharedKey, codes } = this.state.data;
    return !codes ? (
      <GoogleAuthStepsContainer
        authenticatorUri={authenticatorUri}
        sharedKey={sharedKey}
        onSubmit={this.handleSubmit}
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

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(GoogleAuthContainer);
