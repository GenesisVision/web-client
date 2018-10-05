import { GVSwitch } from "gv-react-components";
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
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

export const notificationTypes = PropTypes.oneOf([
  "PlatformNewsAndUpdates",
  "PlatformEmergency",
  "PlatformOther",
  "ProfileUpdated",
  "ProfilePwdUpdated",
  "ProfileVerification",
  "Profile2FA",
  "ProfileSecurity",
  "ProgramNewsAndUpdates",
  "ProgramEndOfPeriod",
  "ProgramCondition",
  "ManagerNewProgram"
]);

class ProgramNotificationsGeneral extends Component {
  state = {
    isPendingProgramNewsAndUpdates: false,
    isPendingProgramEndOfPeriod: false
  };

  handleSwitch = event => {
    const { target } = event;
    if (!this.props.settings[target.name]) {
      this.addNotification(target.name);
    } else {
      this.removeNotification(target.name);
    }
  };

  getPendingName = type => {
    return [`isPending${type}`];
  };

  addNotification = type => {
    const isPending = this.getPendingName(type);
    this.setState({ [isPending]: true });
    this.props.services
      .addProgramNotificationService({
        type,
        programId: this.props.programId
      })
      .finally(() => this.setState({ [isPending]: false }));
  };

  removeNotification = type => {
    const isPending = this.getPendingName(type);
    this.setState({ [isPending]: true });
    this.props.services
      .removeProgramNotificationService(
        this.props.settings[type].id,
        this.props.programId
      )
      .finally(() => this.setState({ [isPending]: false }));
  };

  render() {
    const { t, settings } = this.props;
    return (
      <div>
        <h3>{t("notifications.program.general.title")}</h3>
        <div>
          <label>
            {t("notifications.program.general.news-updates")}
            <GVSwitch
              name="ProgramNewsAndUpdates"
              value={settings.ProgramNewsAndUpdates}
              disabled={this.state.isPendingProgramNewsAndUpdates}
              color="primary"
              onChange={this.handleSwitch}
            />
          </label>
        </div>
        <div>
          <label>
            {t("notifications.program.general.end-of-period")}
            <GVSwitch
              name="ProgramEndOfPeriod"
              value={settings.ProgramEndOfPeriod}
              disabled={this.state.isPendingProgramEndOfPeriod}
              color="primary"
              onChange={this.handleSwitch}
            />
          </label>
        </div>
      </div>
    );
  }
}

ProgramNotificationsGeneral.propTypes = {
  settings: settingsProps
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
