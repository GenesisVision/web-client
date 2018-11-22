import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import GeneralNotification from "shared/components/general-notification/general-notification";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  addFundNotificationService,
  removeFundNotificationService
} from "./services/fund-notifications.services";

class FundNotificationsGeneral extends Component {
  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleAdd = options => {
    const { services, t } = this.props;
    return services
      .addFundNotificationService(options)
      .then(() =>
        this.success(
          t(`notifications.fund.general.${options.type}.enabled-alert`)
        )
      );
  };

  handleRemove = options => {
    const { services, t } = this.props;
    return services
      .removeFundNotificationService(options)
      .then(() =>
        this.success(
          t(`notifications.fund.general.${options.type}.disabled-alert`)
        )
      );
  };
  render() {
    const { t, settings, assetId } = this.props;
    return (
      <div className="notification-settings">
        <h3>{t("notifications.fund.general.title")}</h3>
        <GeneralNotification
          name="FundNewsAndUpdates"
          label={t("notifications.fund.general.news-updates")}
          assetId={assetId}
          setting={settings.FundNewsAndUpdates}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name="FundEndOfPeriod"
          label={t("notifications.fund.general.end-of-period")}
          assetId={assetId}
          setting={settings.FundEndOfPeriod}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name="FundRebalancing"
          label={t("notifications.fund.general.fund-rebalancing")}
          assetId={assetId}
          setting={settings.FundRebalancing}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
      </div>
    );
  }
}

FundNotificationsGeneral.propTypes = {
  settings: PropTypes.object,
  services: PropTypes.shape({
    addFundNotificationService: PropTypes.func,
    removeFundNotificationService: PropTypes.func
  })
};

FundNotificationsGeneral.defaultProps = {
  settings: {}
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
    {
      addFundNotificationService,
      removeFundNotificationService
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
)(FundNotificationsGeneral);
