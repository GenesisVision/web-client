import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import GeneralNotification from "shared/components/general-notification/general-notification";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  addNotificationSettingService,
  removeNotificationSettingService
} from "./services/notification-settings.services";

class NotificationGeneral extends Component {
  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleAdd = options => {
    const { services, t } = this.props;
    return services
      .addNotificationSettingService(options)
      .then(() =>
        this.success(
          t(`notifications-page.general.${options.type}.enabled-alert`)
        )
      );
  };

  handleRemove = options => {
    const { services, t } = this.props;
    return services
      .removeNotificationSettingService(options.id)
      .then(() =>
        this.success(
          t(`notifications-page.general.${options.type}.disabled-alert`)
        )
      );
  };

  render() {
    const { t, settings } = this.props;
    const { PlatformNewsAndUpdates, PlatformEmergency, programId } = settings;
    return (
      <div className="notification-settings">
        <h3 className="notification-settings__subtitle">
          {t("notifications-page.general.title")}
        </h3>
        <GeneralNotification
          name="PlatformNewsAndUpdates"
          label={t("notifications-page.general.news-updates")}
          programId={programId}
          setting={PlatformNewsAndUpdates}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name="PlatformEmergency"
          label={t("notifications-page.general.emergency")}
          programId={programId}
          setting={PlatformEmergency}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
      </div>
    );
  }
}

NotificationGeneral.propTypes = {
  settings: PropTypes.object,
  services: PropTypes.shape({
    removeNotificationSettingService: PropTypes.func,
    addNotificationSettingService: PropTypes.func
  })
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
    { removeNotificationSettingService, addNotificationSettingService },
    dispatch
  ),
  dispatch
});

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(NotificationGeneral);
