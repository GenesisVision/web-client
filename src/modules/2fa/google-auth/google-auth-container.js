import GVqr from "components/gv-qr/gv-qr";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

const GoogleStep1 = ({ t }) => {
  return (
    <div className="google-auth__step">
      01
      <div className="google-auth__title">{t("2fa.download-app")}</div>
    </div>
  );
};

const GoogleStep2 = ({ t, authenticatorUri, sharedKey }) => {
  return (
    <div className="google-auth__step">
      02
      <div className="google-auth__title">{t("2fa.scan-code")}</div>
      <div className="google-auth__qr">
        <GVqr value={authenticatorUri} size={250} />
      </div>
      <p>{t("2fa.alt-code")}</p>
      <h2>{sharedKey}</h2>
    </div>
  );
};

GoogleStep2.propTypes = {
  authenticatorUri: PropTypes.string.isRequired,
  sharedKey: PropTypes.string.isRequired
};

const GoogleStep3 = ({ t }) => {
  return (
    <div className="google-auth__step">
      03
      <div className="google-auth__title">{t("2fa.enter-code")}</div>
    </div>
  );
};

class GoogleAuthContainer extends Component {
  state = {
    isPending: false,
    data: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    authApiProxy.v10Auth2faCreatePost(authService.getAuthArg()).then(data => {
      console.info(data);
      this.setState({ ...data });
    });
  }

  render() {
    if (!this.state.data) return null;
    const { authenticatorUri, sharedKey } = this.state.data;
    const { t } = this.props;
    return (
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("2fa.title")}</h2>
          <p>{t("2fa.google")}</p>
        </div>
        <div className="google-auth__steps">
          <GoogleStep1 t={t} />
          <GoogleStep2
            t={t}
            authenticatorUri={authenticatorUri}
            sharedKey={sharedKey}
          />
          <GoogleStep3 t={t} />
        </div>
      </div>
    );
  }
}

export default translate()(GoogleAuthContainer);
