import "./notification-settings.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import NotificationGeneral from "./notification-general";
import NotificationManagers from "./notification-managers";
import NotificationPrograms from "./notification-programs";

class NotificationSettings extends Component {
  getGeneralSettings = () => {
    return this.props.settingsGeneral.reduce((acc, setting) => {
      acc[setting.type] = setting;
      return acc;
    }, {});
  };

  render() {
    return (
      <div>
        <NotificationGeneral settings={this.getGeneralSettings()} />
        <NotificationPrograms settings={this.props.settingsProgram} />
        <NotificationManagers settings={this.props.settingsManager} />
      </div>
    );
  }
}

export const settingsProps = PropTypes.arrayOf(
  PropTypes.shape({
    conditionAmount: PropTypes.number,
    conditionType: PropTypes.string,
    id: PropTypes.string,
    managerId: PropTypes.string,
    programId: PropTypes.string,
    type: PropTypes.string
  })
);

NotificationSettings.propTypes = {
  settingsGeneral: settingsProps,
  settingsProgram: settingsProps,
  settingsManager: settingsProps
};

export default NotificationSettings;
