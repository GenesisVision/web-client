import { GVSwitch } from "gv-react-components";
import { settingsProps } from "modules/notification-settings/notification-settings";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
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
  static getDerivedStateFromProps(props, state) {
    return props.settings.reduce((acc, setting) => {
      acc[setting.type] = setting;
      return acc;
    }, {});
  }

  handleSwitch = event => {
    const { target } = event;
    if (!this.state[target.name]) {
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
    notificationsApi
      .v10NotificationsSettingsAddPost(authService.getAuthArg(), {
        type
      })
      .finally(() => this.setState({ [isPending]: false }));
  };

  removeNotification = type => {
    const isPending = this.getPendingName(type);
    this.setState({ [isPending]: true });
    notificationsApi
      .v10NotificationsSettingsRemoveByIdPost(
        this.state[type].id,
        authService.getAuthArg()
      )
      .finally(() => this.setState({ [isPending]: false }));
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <h3>{t("notifications.program.general.title")}</h3>
        <div>
          <label>
            {t("notifications.program.general.news-updates")}
            <GVSwitch
              name="ProgramNewsAndUpdates"
              value={this.state.ProgramNewsAndUpdates}
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
              value={this.state.ProgramEndOfPeriod}
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
  settings: []
};

export default translate()(ProgramNotificationsGeneral);
