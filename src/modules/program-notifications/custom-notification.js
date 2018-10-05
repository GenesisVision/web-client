import {
  GVButton,
  GVFormikField,
  GVSwitch,
  GVTextField
} from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

class CustomNotification extends Component {
  state = {
    isPending: false
  };
  handleSwitch = () => {
    console.info("hello");
  };
  render() {
    const { t, settings } = this.props;
    return (
      <div className="custom-notification">
        <label>
          <GVSwitch
            name={settings.type}
            value={settings.isEnabled || true}
            disabled={this.state.isPending}
            color="primary"
            onChange={this.handleSwitch}
          />
          {t("notifications.program.create.type-profit")}
        </label>
        <GVTextField
          name="conditionAmount"
          label={t("notifications.program.create.amount-label")}
          adornment="%"
          autoComplete="off"
          InputComponent={NumberFormat}
        />
        <GVButton variant="text" color="secondary">
          {t("buttons.delete")}
        </GVButton>
      </div>
    );
  }
}

CustomNotification.propTypes = {};

export default translate()(CustomNotification);
