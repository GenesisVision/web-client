import ProgramNotificationsCustom from "shared/modules/program-notifications/program-notifications-custom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

import ProgramNotificationsGeneral from "./program-notificatations-general";

class ProgramNotifications extends Component {
  getGeneralSettings = () => {
    return this.props.program.settingsGeneral.reduce((acc, setting) => {
      acc[setting.type] = setting;
      return acc;
    }, {});
  };
  render() {
    const { program } = this.props;
    return (
      <div>
        <h3 className="notification-settings__title">{program.title}</h3>
        <ProgramNotificationsGeneral
          settings={this.getGeneralSettings()}
          assetId={program.assetId}
        />
        <ProgramNotificationsCustom program={program} />
      </div>
    );
  }
}

const settingsGeneralProps = PropTypes.shape({
  id: PropTypes.string,
  assetId: PropTypes.string,
  managerId: PropTypes.string,
  type: PropTypes.string,
  conditionType: PropTypes.string,
  conditionAmount: PropTypes.number
});

const settingsCustomProps = PropTypes.shape({
  id: PropTypes.string,
  assetId: PropTypes.string,
  managerId: PropTypes.string,
  type: PropTypes.string,
  conditionType: PropTypes.string,
  conditionAmount: PropTypes.number
});

ProgramNotifications.propTypes = {
  t: PropTypes.func,
  program: PropTypes.shape({
    assetId: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    logo: PropTypes.string,
    level: PropTypes.number,
    settingsGeneral: PropTypes.arrayOf(settingsGeneralProps),
    settingsCustom: PropTypes.arrayOf(settingsCustomProps)
  })
};

export default translate()(ProgramNotifications);
