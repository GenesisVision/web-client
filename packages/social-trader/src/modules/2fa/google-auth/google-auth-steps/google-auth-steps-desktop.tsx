import * as React from "react";
import { useTranslation } from "react-i18next";

import GoogleActivateStep, {
  IGoogleActivateStepFormValues
} from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";

const GoogleAuth: React.FC<IGoogleAuthProps> = ({
  enablePassword,
  authenticatorUri,
  sharedKey,
  onSubmit,
  errorMessage
}) => {
  const [t] = useTranslation();
  return (
    <div className="google-auth google-auth--desktop">
      <div className="google-auth__header">
        <h2>{t("2fa-page.title")}</h2>
        <p>{t("2fa-page.google")}</p>
      </div>

      <div className="google-auth__steps">
        <GoogleDownloadStep />
        <GoogleCodeStep
          className="google-auth__step--alt-color"
          authenticatorUri={authenticatorUri}
          sharedKey={sharedKey}
        />
        <GoogleActivateStep
          onSubmit={onSubmit}
          errorMessage={errorMessage}
          enablePassword={enablePassword}
        />
      </div>
    </div>
  );
};

export interface IGoogleAuthProps {
  enablePassword?: boolean;
  authenticatorUri: string;
  sharedKey: string;
  onSubmit: (twoFactorCode: IGoogleActivateStepFormValues) => void;
  errorMessage?: string;
}

const GoogleAuthDesktop = React.memo(GoogleAuth);
export default GoogleAuthDesktop;
