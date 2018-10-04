import { GVSwitch } from "gv-react-components";
import { settingsProps } from "modules/notification-settings/notification-settings";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

class NotificationGeneral extends Component {
  state = {
    isPendingPlatformNewsAndUpdates: false,
    isPendingPlatformEmergency: false
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
        <h3>{t("notifications.general.title")}</h3>
        <div>
          <label>
            {t("notifications.general.news-updates")}
            <GVSwitch
              name="PlatformNewsAndUpdates"
              value={this.state.PlatformNewsAndUpdates}
              disabled={this.state.isPendingPlatformNewsAndUpdates}
              color="primary"
              onChange={this.handleSwitch}
            />
          </label>
        </div>
        <div>
          <label>
            {t("notifications.general.emergency")}
            <GVSwitch
              name="PlatformEmergency"
              value={this.state.PlatformEmergency}
              disabled={this.state.isPendingPlatformEmergency}
              color="primary"
              onChange={this.handleSwitch}
            />
          </label>
        </div>
      </div>
    );
  }
}

NotificationGeneral.propTypes = {
  settings: settingsProps
};

NotificationGeneral.defaultProps = {
  settings: []
};

export default translate()(NotificationGeneral);
