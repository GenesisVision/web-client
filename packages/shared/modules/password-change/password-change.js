import "./password-change.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { compose } from "redux";
import authActions from "shared/actions/auth-actions";
import { SETTINGS_ROUTE } from "shared/components/profile/profile.constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import PasswordChangeForm from "shared/modules/password-change/password-change-form";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

class PasswordChange extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null
  };

  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  updateToken = token => {
    authService.storeToken(token);
    this.props.dispatch(authActions.updateToken());
    this.props.dispatch(push(SETTINGS_ROUTE));
    this.success(this.props.t("auth.password-change.success-alert"));
  };

  handleSubmit = model => {
    this.setState({ isPending: true, errorMessage: null });
    authApi
      .v10AuthPasswordChangePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.updateToken(data);
      })
      .catch(data => {
        this.setState({ data });
      });
  };

  render() {
    return (
      <PasswordChangeForm
        onSubmit={this.handleSubmit}
        isPending={this.state.isPending}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

const PasswordChangeContainer = compose(
  connect(),
  translate()
)(PasswordChange);

export default PasswordChangeContainer;
