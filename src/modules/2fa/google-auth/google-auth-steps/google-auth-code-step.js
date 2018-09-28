import classnames from "classnames";
import GVqr from "components/gv-qr/gv-qr";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

const GoogleStep2 = ({ t, authenticatorUri, sharedKey, className }) => {
  return (
    <div className={classnames("google-auth__step", className)}>
      <div className="google-auth__count">02</div>
      <div className="google-auth__title">{t("2fa.scan-code")}</div>
      <div className="google-auth__qr">
        <GVqr value={authenticatorUri} size={250} />
      </div>
      <p className="google-auth__alt-text">{t("2fa.alt-code")}</p>
      <h2 className="google-auth__alt-code">{sharedKey}</h2>
    </div>
  );
};

GoogleStep2.propTypes = {
  authenticatorUri: PropTypes.string.isRequired,
  sharedKey: PropTypes.string.isRequired
};

const GoogleCodeStep = translate()(GoogleStep2);

export default GoogleCodeStep;
