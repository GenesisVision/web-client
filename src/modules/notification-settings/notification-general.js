import { GVSwitch } from "gv-react-components";
import { settingsProps } from "modules/notification-settings/notification-settings";
import {
  addNotificationSettingService,
  removeNotificationSettingService
} from "modules/notification-settings/services/notification-settings.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

class NotificationGeneral extends Component {
  state = {
    isPendingPlatformNewsAndUpdates: false,
    isPendingPlatformEmergency: false
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
    this.props.service
      .addNotificationSettingService({
        type
      })
      .finally(() => this.setState({ [isPending]: false }));
  };

  removeNotification = type => {
    const isPending = this.getPendingName(type);
    this.setState({ [isPending]: true });
    this.props.service
      .removeNotificationSettingService(this.props.settings[type].id)
      .finally(() => this.setState({ [isPending]: false }));
  };

  render() {
    const { t, settings } = this.props;
    const { PlatformNewsAndUpdates, PlatformEmergency } = settings;
    return (
      <div>
        <h3>{t("notifications.general.title")}</h3>
        <div>
          <label>
            {t("notifications.general.news-updates")}
            <GVSwitch
              name="PlatformNewsAndUpdates"
              value={PlatformNewsAndUpdates}
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
              value={PlatformEmergency}
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

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { removeNotificationSettingService, addNotificationSettingService },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(NotificationGeneral);
