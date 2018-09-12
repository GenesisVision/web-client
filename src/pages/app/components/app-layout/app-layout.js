import "./app-layout.scss";

import platformActions from "actions/platform-actions";
import Header from "components/header/header";
import HeaderContainer from "modules/profile-header/components/profile-header-container";
import NotificationsContainer from "pages/app/components/notifications/components/notifications-container";
import React, { Component } from "react";
import { connect } from "react-redux";

class AppLayout extends Component {
  componentDidMount() {
    this.props.fetchPlatformSettings();
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <HeaderContainer />
        </div>
        <div className="app__main">{this.props.children}</div>
        <NotificationsContainer />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    fetchPlatformSettings: () => dispatch(platformActions.fetchPlatformSettings)
  }),
  null,
  { pure: false }
)(AppLayout);
