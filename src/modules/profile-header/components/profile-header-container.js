import Header from "components/header/header";
import { fetchProfileHeaderInfo } from "modules/profile-header/actions/profile-header-actions";
import ProfileHeader from "modules/profile-header/components/profile-header";
import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

import { logout } from "../../../pages/auth/login/services/login.service";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.isAuthenticated && this.props.fetchProfileHeaderInfo();
  }

  render() {
    const {
      info,
      logout,
      notificationsToggle,
      fetchProfileHeaderInfo,
      isAuthenticated,
      ...other
    } = this.props;
    // if (!info.data) return null;
    console.info(this.props);
    return (
      <Header
        {...info.data}
        {...other}
        isAuthenticated={isAuthenticated}
        logout={logout}
        openNotifications={notificationsToggle}
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
  ...state.profileHeader,
  isAuthenticated: state.authData.isAuthenticated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(HeaderContainer);
