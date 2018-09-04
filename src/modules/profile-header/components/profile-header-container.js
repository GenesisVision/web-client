import { fetchProfileHeaderInfo } from "modules/profile-header/actions/profile-header-actions";
import ProfileHeader from "modules/profile-header/components/profile-header";
import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

import { logout } from "../../../pages/auth/login/services/login.service";

class ProfileHeaderContainer extends Component {
  componentDidMount() {
    this.props.fetchProfileHeaderInfo();
  }

  render() {
    if (!this.props.info.data) return null;
    return (
      <ProfileHeader
        {...this.props.info.data}
        logout={this.props.logout}
        openNotifications={this.props.notificationsToggle}
      />
    );
  }
}

const mapDispatchToProps = {
  fetchProfileHeaderInfo,
  logout,
  notificationsToggle
};

const mapStateToProps = state => ({
  ...state.profileHeader
});

export default compose(
  isAuthenticated,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileHeaderContainer);
