import ProgramNotificationsCustom from "modules/program-notifications/program-notifications-custom";
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
    const { t, program } = this.props;
    return (
      <div>
        <h3>{program.title}</h3>
        <ProgramNotificationsGeneral
          settings={this.getGeneralSettings()}
          programId={program.programId}
        />
        <ProgramNotificationsCustom
          // settings={program.settingsCustom}
          program={program}
        />
      </div>
    );
  }
}

const settingsGeneralProps = PropTypes.shape({
  id: PropTypes.string,
  programId: PropTypes.string,
  managerId: PropTypes.string,
  type: PropTypes.string,
  conditionType: PropTypes.string,
  conditionAmount: PropTypes.number
});

const settingsCustomProps = PropTypes.shape({
  id: PropTypes.string,
  programId: PropTypes.string,
  managerId: PropTypes.string,
  type: PropTypes.string,
  conditionType: PropTypes.string,
  conditionAmount: PropTypes.number
});

ProgramNotifications.propTypes = {
  t: PropTypes.func,
  program: PropTypes.shape({
    programId: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    logo: PropTypes.string,
    level: PropTypes.number,
    settingsGeneral: PropTypes.arrayOf(settingsGeneralProps),
    settingsCustom: PropTypes.arrayOf(settingsCustomProps)
  })
};

export default translate()(ProgramNotifications);
