import DisableAuthForm from "modules/2fa/disable-auth/disable-auth-form";
import React, { Component } from "react";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

class DisableAuthContainer extends Component {
  state = {
    isPending: false
  };
  handleSubmit = model => {
    this.setState({ isPending: true });
    authApiProxy
      .v10Auth2faDisablePost(authService.getAuthArg(), {
        model
      })
      .then(data => this.setState({ ...data }, this.props.onSubmit));
  };
  render() {
    return (
      <DisableAuthForm
        onSubmit={this.handleSubmit}
        disabled={this.state.isPending}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

DisableAuthContainer.propTypes = {};

export default DisableAuthContainer;
