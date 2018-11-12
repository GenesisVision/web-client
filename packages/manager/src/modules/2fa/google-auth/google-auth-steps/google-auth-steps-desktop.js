import GoogleActivateStep from "modules/2fa/google-auth/google-auth-steps/google-auth-activate-step";
import GoogleCodeStep from "modules/2fa/google-auth/google-auth-steps/google-auth-code-step";
import GoogleDownloadStep from "modules/2fa/google-auth/google-auth-steps/google-auth-download-step";
import React from "react";
import { translate } from "react-i18next";

const GoogleAuth = ({
  authenticatorUri,
  sharedKey,
  t,
  onSubmit,
  disabled,
  errorMessage
}) => {
  return (
    <div className="dialog google-auth google-auth--desktop">
      <div className="dialog__header">
        <h2>{t("2fa.title")}</h2>
        <p>{t("2fa.google")}</p>
      </div>

      <div className="google-auth__steps">
        <GoogleDownloadStep />
        <GoogleCodeStep
          className="google-auth__step--alt-color"
          t={t}
          authenticatorUri={authenticatorUri}
          sharedKey={sharedKey}
        />
        <GoogleActivateStep
          onSubmit={onSubmit}
          disabled={disabled}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

const GoogleAuthDesktop = translate()(GoogleAuth);

export default GoogleAuthDesktop;
