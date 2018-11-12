import { fetchTwoFactor } from "shared/actions/2fa-actions";
import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../../../pages/auth/login/services/login.service";
import Header from "./header";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.isAuthenticated && this.props.fetchProfileHeaderInfo();
    this.props.isAuthenticated && this.props.fetchTwoFactor();
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
  notificationsToggle,
  fetchTwoFactor
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
