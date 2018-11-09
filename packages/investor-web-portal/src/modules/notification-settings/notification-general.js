import GeneralNotification from "shared/components/general-notification/general-notification";
import {
  addNotificationSettingService,
  removeNotificationSettingService
} from "modules/notification-settings/services/notification-settings.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

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
        this.success(t(`notifications.general.${options.type}.enabled-alert`))
      );
  };

  handleRemove = options => {
    const { services, t } = this.props;
    return services
      .removeNotificationSettingService(options.id)
      .then(() =>
        this.success(t(`notifications.general.${options.type}.disabled-alert`))
      );
  };

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
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name="PlatformEmergency"
          label={t("notifications.general.emergency")}
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

NotificationGeneral.defaultProps = {
  settings: []
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
