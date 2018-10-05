import GeneralNotification from "components/general-notification/general-notification";
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
  render() {
    const { t, settings } = this.props;
    const { PlatformNewsAndUpdates, PlatformEmergency, programId } = settings;
    return (
      <div className="notification-settings">
        <h3>{t("notifications.general.title")}</h3>
        <GeneralNotification
          name="PlatformNewsAndUpdates"
          label={t("notifications.general.news-updates")}
          programId={programId}
          setting={PlatformNewsAndUpdates}
          addNotification={this.props.services.addNotificationSettingService}
          removeNotification={
            this.props.services.removeNotificationSettingService
          }
        />
        <GeneralNotification
          name="PlatformEmergency"
          label={t("notifications.general.emergency")}
          programId={programId}
          setting={PlatformEmergency}
          addNotification={this.props.services.addNotificationSettingService}
          removeNotification={
            this.props.services.removeNotificationSettingService
          }
        />
      </div>
    );
  }
}

NotificationGeneral.propTypes = {
  settings: settingsProps,
  services: PropTypes.shape({
    removeNotificationSettingService: PropTypes.func,
    addNotificationSettingService: PropTypes.func
  })
};

NotificationGeneral.defaultProps = {
  settings: []
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
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
