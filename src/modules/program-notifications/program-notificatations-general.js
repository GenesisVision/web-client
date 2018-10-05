import GeneralNotification from "components/general-notification/general-notification";
import { settingsProps } from "modules/notification-settings/notification-settings";
import {
  addProgramNotificationService,
  removeProgramNotificationService
} from "modules/program-notifications/services/program-notifications.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

class ProgramNotificationsGeneral extends Component {
  render() {
    const { t, settings, programId } = this.props;
    return (
      <div className="notification-settings">
        <h3>{t("notifications.program.general.title")}</h3>
        <GeneralNotification
          name="ProgramNewsAndUpdates"
          label={t("notifications.program.general.news-updates")}
          programId={programId}
          setting={settings.ProgramNewsAndUpdates}
          addNotification={this.props.services.addProgramNotificationService}
          removeNotification={
            this.props.services.removeProgramNotificationService
          }
        />
        <GeneralNotification
          name="ProgramEndOfPeriod"
          label={t("notifications.program.general.end-of-period")}
          programId={programId}
          setting={settings.ProgramEndOfPeriod}
          addNotification={this.props.services.addProgramNotificationService}
          removeNotification={
            this.props.services.removeProgramNotificationService
          }
        />
      </div>
    );
  }
}

ProgramNotificationsGeneral.propTypes = {
  settings: settingsProps,
  services: PropTypes.shape({
    addProgramNotificationService: PropTypes.func,
    removeProgramNotificationService: PropTypes.func
  })
};

ProgramNotificationsGeneral.defaultProps = {
  settings: {}
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
    {
      addProgramNotificationService,
      removeProgramNotificationService
    },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(ProgramNotificationsGeneral);
