import Dialog from "components/dialog/dialog";
import Select from "components/select/select";
import { GVTextField } from "gv-react-components";
import DisableAuthContainer from "modules/2fa/disable-auth/disable-auth-container";
import GoogleAuthPopup from "modules/2fa/google-auth/google-auth-popup";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

import GoogleAuthContainer from "./google-auth/google-auth-container";

const components = {
  google: GoogleAuthContainer,
  disable: DisableAuthContainer
};

class TwoFactorAuthContainer extends Component {
  state = {
    isPending: false,
    data: {
      twoFactorEnabled: false
    },
    component: null
  };

  handleChange = event => {
    this.setState({ component: components[event.target.value] });
  };

  componentDidMount() {
    authApiProxy.v10Auth2faGet(authService.getAuthArg()).then(data => {
      console.info(data);
      this.setState({ ...data });
    });
  }

  handleClose = () => {
    this.setState({ component: null });
  };

  render() {
    const { t } = this.props;
    const { component: Child } = this.state;
    return (
      <div className="two-factor">
        <h3>{t("2fa.title")}</h3>
        <GVTextField
          name="2fa"
          label={t("2fa.type")}
          value={this.state.data.twoFactorEnabled ? "google" : "disable"}
          onChange={this.handleChange}
          InputComponent={Select}
        >
          <option value={"disable"}>{t("2fa.none")}</option>
          <option value={"google"}>{t("2fa.google")}</option>
        </GVTextField>
        <Dialog open={Boolean(this.state.component)} onClose={this.handleClose}>
          <Child />
        </Dialog>
      </div>
    );
  }
}

TwoFactorAuthContainer.propTypes = {};

export default translate()(TwoFactorAuthContainer);
