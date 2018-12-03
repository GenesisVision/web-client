import pickBy from "lodash.pickby";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

class ProfileContainer extends Component {
  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
    this.fetch();
  };

  state = {
    data: null,
    isPending: false
  };

  handleEdit = values => {
    const model = pickBy(values, str => Boolean(str));
    this.setState({ isPending: true });
    profileApi
      .v10ProfilePersonalUpdatePost(authService.getAuthArg(), {
        model
      })
      .then(() => {
        this.setState({ isPending: false });
        this.success(this.props.t("profile.success-edit"));
      });
  };

  handleVerify = () => {
    this.success(this.props.t("profile.success-verify"));
  };

  componentDidMount() {
    this.setState({ isPending: true });
    profileApi
      .v10ProfileGet(authService.getAuthArg())
      .then(data => this.setState({ data }));
  }

  fetch() {
    this.setState({ isPending: true });
    profileApi
      .v10ProfileGet(authService.getAuthArg())
      .then(data => this.setState({ data }));
  }

  render() {
    if (!this.state.data) return null;
    const child = React.Children.only(this.props.children);
    return (
      <child.type
        {...child.props}
        info={this.state.data}
        onSubmit={this.handleEdit}
        onVerify={this.handleVerify}
      />
    );
  }
}

export default translate()(ProfileContainer);
