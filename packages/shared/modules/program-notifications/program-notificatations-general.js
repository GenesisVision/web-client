import GeneralNotification from "shared/components/general-notification/general-notification";
import {
  addProgramNotificationService,
  removeProgramNotificationService
} from "./services/program-notifications.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

class ProgramNotificationsGeneral extends Component {
  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleAdd = options => {
    const { services, t } = this.props;
    return services
      .addProgramNotificationService(options)
      .then(() =>
        this.success(
          t(`notifications.program.general.${options.type}.enabled-alert`)
        )
      );
  };

  handleRemove = options => {
    const { services, t } = this.props;
    return services
      .removeProgramNotificationService(options)
      .then(() =>
        this.success(
          t(`notifications.program.general.${options.type}.disabled-alert`)
        )
      );
  };
  render() {
    const { t, settings, assetId } = this.props;
    return (
      <div className="notification-settings">
        <h3 className="notification-settings__subtitle">{t("notifications.program.general.title")}</h3>
        <GeneralNotification
          name="ProgramNewsAndUpdates"
          label={t("notifications.program.general.news-updates")}
          assetId={assetId}
          setting={settings.ProgramNewsAndUpdates}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name="ProgramEndOfPeriod"
          label={t("notifications.program.general.end-of-period")}
          assetId={assetId}
          setting={settings.ProgramEndOfPeriod}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
      </div>
    );
  }
}

ProgramNotificationsGeneral.propTypes = {
  settings: PropTypes.object,
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
  ),
  dispatch
});

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(ProgramNotificationsGeneral);
