import Select from "components/select/select";
import { GVTextField } from "gv-react-components";
import GoogleAuthPopup from "modules/2fa/google-auth/google-auth-popup";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

class TwoFactorAuthContainer extends Component {
  state = {
    authType: 0
  };
  handleChange = event => {
    this.setState({ authType: event.target.value });
  };
  render() {
    const { t } = this.props;
    return (
      <div className="two-factor">
        <h3>{t("2fa.title")}</h3>
        <GVTextField
          name="d"
          InputComponent={Select}
          value={this.state.authType}
          onChange={this.handleChange}
          label={t("2fa.type")}
        >
          <option value={0}>{t("2fa.none")}</option>
          <option value={"google"}>{t("2fa.google")}</option>
        </GVTextField>
        <GoogleAuthPopup open={true} />
      </div>
    );
  }
}

TwoFactorAuthContainer.propTypes = {};

export default translate()(TwoFactorAuthContainer);
