import "./custom-notification.scss";

import { GVButton, GVSwitch, GVTextField } from "gv-react-components";
import {
  removeProgramNotificationService,
  toggleProgramNotificationsService
} from "modules/program-notifications/services/program-notifications.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

class CustomNotification extends Component {
  state = {
    isPending: false
  };
  handleSwitch = () => {
    this.setState({ isPending: true });
    this.props.services
      .toggleProgramNotificationsService({
        id: this.props.settings.id,
        programId: this.props.settings.programId,
        enabled: !Boolean(this.props.settings.isEnabled)
      })
      .finally(() => this.setState({ isPending: false }));
  };
  handleDelete = () => {
    this.setState({ isPending: true });
    this.props.services
      .removeProgramNotificationService(
        this.props.settings.id,
        this.props.settings.programId
      )
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
            {t("notifications.program.create.type-profit")}
          </span>
        </label>
        <div className="custom-notification__offset">
          <GVTextField
            name="conditionAmount"
            value={settings.conditionAmount}
            disabled
            label={t("notifications.program.create.amount-label")}
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
    removeProgramNotificationService: PropTypes.func,
    toggleProgramNotificationsService: PropTypes.func
  })
};

const mapStateToProps = dispatch => ({
  services: bindActionCreators(
    { removeProgramNotificationService, toggleProgramNotificationsService },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    undefined,
    mapStateToProps
  )
)(CustomNotification);
