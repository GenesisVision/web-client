import PropTypes from "prop-types";
import React, { Component } from "react";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

import NotificationSettings from "./notification-settings";

class NotificationSettingsContainer extends Component {
  state = {
    settingsGeneral: [],
    settingsProgram: []
  };
  componentDidMount() {
    notificationsApi
      .v10NotificationsSettingsGet(authService.getAuthArg())
      .then(data => this.setState({ ...data }));
  }

  render() {
    return (
      <NotificationSettings
        settingsGeneral={this.state.settingsGeneral}
        settingsProgram={this.state.settingsProgram}
      />
    );
  }
}

NotificationSettingsContainer.propTypes = {};

export default NotificationSettingsContainer;
