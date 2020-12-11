import {
  GoogleAuthHeader,
  GoogleAuthSteps,
  GoogleAuthStyledContainer
} from "modules/2fa/google-auth/google-auth-steps/google-auth-steps.styles";
import * as React from "react";
import { useTranslation } from "react-i18next";

import GoogleActivateStep, {
  IGoogleActivateStepFormValues
} from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";

export interface IGoogleAuthProps {
  enablePassword?: boolean;
  authenticatorUri: string;
  sharedKey: string;
  onSubmit: (twoFactorCode: IGoogleActivateStepFormValues) => void;
  errorMessage?: string;
}

const GoogleAuth: React.FC<IGoogleAuthProps> = ({
  enablePassword,
  authenticatorUri,
  sharedKey,
  onSubmit,
  errorMessage
}) => {
  const [t] = useTranslation();
  return (
    <GoogleAuthStyledContainer desktop>
      <GoogleAuthHeader>
        <h2>{t("profile-page:2fa-page.title")}</h2>
        <p>{t("profile-page:2fa-page.google")}</p>
      </GoogleAuthHeader>

      <GoogleAuthSteps>
        <GoogleDownloadStep />
        <GoogleCodeStep
          altColor
          authenticatorUri={authenticatorUri}
          sharedKey={sharedKey}
        />
        <GoogleActivateStep
          onSubmit={onSubmit}
          errorMessage={errorMessage}
          enablePassword={enablePassword}
        />
      </GoogleAuthSteps>
    </GoogleAuthStyledContainer>
  );
};

const GoogleAuthDesktop = React.memo(GoogleAuth);
export default GoogleAuthDesktop;
