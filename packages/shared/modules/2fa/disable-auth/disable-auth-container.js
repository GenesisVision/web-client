import React, { Component } from "react";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import DisableAuthForm from "./disable-auth-form";
import DisableAuthSuccess from "./disable-auth-success";

class DisableAuthContainer extends Component {
  state = {
    isPending: false,
    success: false,
    errorMessage: ""
  };
  handleSubmit = model => {
    this.setState({ isPending: true });
    authApi
      .v10Auth2faDisablePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.setState({ data, success: true }, this.props.onSubmit);
      })
      .catch(data => {
        this.setState({ data, success: false });
      });
  };
  render() {
    const { success, isPending, errorMessage } = this.state;
    return success ? (
      <DisableAuthSuccess />
    ) : (
      <DisableAuthForm
        onSubmit={this.handleSubmit}
        disabled={isPending}
        errorMessage={errorMessage}
      />
    );
  }
}

DisableAuthContainer.propTypes = {};

export default DisableAuthContainer;
