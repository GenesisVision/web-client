import "./custom-notification.scss";

import { GVButton, GVSwitch, GVTextField } from "gv-react-components";
import {
  removeFundNotificationService,
  toggleFundNotificationsService
} from "modules/fund-notifications/services/fund-notifications.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

class CustomNotification extends Component {
  state = {
    isPending: false
  };

  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleSwitch = () => {
    this.setState({ isPending: true });
    const { services, settings, t } = this.props;
    const status = !Boolean(settings.isEnabled);
    services
      .toggleFundNotificationsService({
        id: settings.id,
        fundId: settings.fundId,
        enabled: status
      })
      .then(() => {
        this.success(
          t(
            `fund.custom.${
              status ? "enabled" : "disabled"
            }-alert`
          )
        );
      })
      .finally(() => this.setState({ isPending: false }));
  };

  handleDelete = () => {
    this.setState({ isPending: true });
    const { t, settings } = this.props;
    this.props.services
      .removeFundNotificationService(settings)
      .then(() => {
        this.success(t(`fund.custom.delete-alert`));
      })
      .finally(() => this.setState({ isPending: false }));
  };

  render() {
    const { t, settings } = this.props;
    return (
      <div className="custom-notification">
        <label className="notification-setting">
          <GVSwitch
            className="notification-setting__switch"
            name={settings.type}
            value={settings.isEnabled}
            disabled={this.state.isPending}
            color="primary"
            onChange={this.handleSwitch}
          />
          <span className="notification-setting__label">
            {t(`fund.create.${settings.conditionType}.title`)}
          </span>
        </label>
        <div className="custom-notification__offset">
          <GVTextField
            name="conditionAmount"
            value={settings.conditionAmount.toString()}
            disabled
            label={t(
              `fund.create.${settings.conditionType}.label`
            )}
            adornment="%"
            autoComplete="off"
            InputComponent={NumberFormat}
          />
          <GVButton
            variant="text"
            color="secondary"
            disabled={this.state.isPending}
            onClick={this.handleDelete}
          >
            {t("buttons.delete")}
          </GVButton>
        </div>
      </div>
    );
  }
}

CustomNotification.propTypes = {
  services: PropTypes.shape({
    removeFundNotificationService: PropTypes.func,
    toggleFundNotificationsService: PropTypes.func
  })
};

const mapStateToProps = dispatch => ({
  services: bindActionCreators(
    { removeFundNotificationService, toggleFundNotificationsService },
    dispatch
  ),
  dispatch
});

export default compose(
  translate(),
  connect(
    undefined,
    mapStateToProps
  )
)(CustomNotification);
