import React, { Component } from "react";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import DisableAuthForm from "./disable-auth-form";
import DisableAuthSuccess from "./disable-auth-success";

class DisableAuthContainer extends Component {
  state = {
    success: false,
    errorMessage: ""
  };
  handleSubmit = (model, setSubmitting) => {
    authApi
      .v10Auth2faDisablePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.setState({ ...data, success: true }, this.props.onSubmit);
      })
      .catch(error => {
        this.setState({ ...error, success: false });
        setSubmitting(false);
      });
  };
  render() {
    const { success, isPending, errorMessage } = this.state;
    return success ? (
      <DisableAuthSuccess />
    ) : (
      <DisableAuthForm
        onSubmit={this.handleSubmit}
        errorMessage={errorMessage}
      />
    );
  }
}

DisableAuthContainer.propTypes = {};

export default DisableAuthContainer;
