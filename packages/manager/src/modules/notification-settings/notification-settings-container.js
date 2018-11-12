import { fetchNotificationSettingsService } from "modules/notification-settings/services/notification-settings.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NotificationSettings from "./notification-settings";

class NotificationSettingsContainer extends Component {
  componentDidMount() {
    const { fetchNotificationSettingsService } = this.props.services;
    fetchNotificationSettingsService();
  }

  render() {
    return (
      <NotificationSettings
        settingsGeneral={this.props.settingsGeneral}
        settingsProgram={this.props.settingsProgram}
        settingsManager={this.props.settingsManager}
      />
    );
  }
}

NotificationSettingsContainer.propTypes = {
  settingsGeneral: PropTypes.array,
  settingsProgram: PropTypes.array,
  settingsManager: PropTypes.array
};

const mapStateToProps = state => ({
  ...state.notificationSettings
});

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ fetchNotificationSettingsService }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationSettingsContainer
);
