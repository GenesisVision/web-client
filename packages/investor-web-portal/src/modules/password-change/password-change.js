import "./password-change.scss";

import PasswordChangeForm from "modules/password-change/password-change-form";
import { logout } from "pages/auth/login/services/login.service";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

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

  logout = () => {
    this.props.dispatch(logout());
  };

  handleSubmit = model => {
    this.setState({ isPending: true, errorMessage: null });
    authApiProxy
      .v10AuthPasswordChangePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.logout();
        this.setState({ ...data });
        this.success(this.props.t("password-change.success-alert"));
      })
      .catch(data => {
        this.setState({ ...data });
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

PasswordChange.propTypes = {};

export default compose(
  connect(),
  translate()
)(PasswordChange);
