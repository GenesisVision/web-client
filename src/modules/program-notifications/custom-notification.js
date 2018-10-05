import "./custom-notification.scss";

import { GVButton, GVSwitch, GVTextField } from "gv-react-components";
import { removeProgramNotificationService } from "modules/program-notifications/services/program-notifications.services";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

class CustomNotification extends Component {
  state = {
    isPending: false
  };
  handleSwitch = () => {};
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
        <label>
          <GVSwitch
            name={settings.type}
            value={true}
            disabled={this.state.isPending}
            color="primary"
            onChange={this.handleSwitch}
          />
          {t("notifications.program.create.type-profit")}
        </label>
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
    );
  }
}

CustomNotification.propTypes = {};
const mapStateToProps = dispatch => ({
  services: bindActionCreators({ removeProgramNotificationService }, dispatch)
});
export default compose(
  translate(),
  connect(
    undefined,
    mapStateToProps
  )
)(CustomNotification);
