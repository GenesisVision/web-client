import "./notification-settings.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import NotificationGeneral from "./notification-general";
import NotificationPrograms from "./notification-programs";

class NotificationSettings extends Component {
  render() {
    return (
      <div>
        <NotificationGeneral settings={this.props.settingsGeneral} />
        <NotificationPrograms settings={this.props.settingsProgram} />
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
