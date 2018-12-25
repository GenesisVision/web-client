import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTwoFactor } from "shared/actions/2fa-actions";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import Header from "shared/components/header/header";

import { logout } from "../../../pages/auth/login/services/login.service";

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
      backPath,
      ...other
    } = this.props;
    return (
      <Header
        {...info.data}
        {...other}
        backPath={backPath}
        isAuthenticated={isAuthenticated}
        logout={logout}
        openNotifications={notificationsToggle}
        LOGIN_ROUTE={LOGIN_ROUTE}
        SIGNUP_ROUTE={SIGNUP_ROUTE}
        GLOBAL_SEARCH_ROUTE={GLOBAL_SEARCH_ROUTE}
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
  isAuthenticated: state.authData.isAuthenticated,
  backPath: state.routing.location.pathname
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(HeaderContainer);
