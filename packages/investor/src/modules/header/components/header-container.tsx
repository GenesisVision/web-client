import { ProfileHeaderViewModel } from "gv-api-web";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTwoFactor } from "shared/actions/2fa-actions";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import Header from "shared/components/header/header";

import { notificationsToggle } from "../../../pages/app/components/notifications/actions/notifications.actions";
import { LOGIN_ROUTE } from "../../../pages/auth/login/login.routes";
import { logout } from "../../../pages/auth/login/services/login.service";
import { SIGNUP_ROUTE } from "../../../pages/auth/signup/signup.routes";
import { IState } from "../../../reducers";

export interface IHeaderContainerProps {
  isAuthenticated: boolean;
  info: ProfileHeaderViewModel | undefined;
  fetchProfileHeaderInfo(): any;
  fetchTwoFactor(): any;
  logout(): any;
  notificationsToggle(): any;
  backPath: string;
}

class HeaderContainer extends Component<IHeaderContainerProps> {
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
      backPath
    } = this.props;
    return (
      <Header
        profileHeader={info}
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

const mapStateToProps = (state: IState) => ({
  info: state.profileHeader.info.data,
  isAuthenticated: state.authData.isAuthenticated,
  backPath: state.routing.location ? state.routing.location.pathname : null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(HeaderContainer);
