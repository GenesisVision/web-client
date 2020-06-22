import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "../google-auth.module.scss";
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
    <div
      className={classNames(
        styles["google-auth"],
        styles["google-auth--desktop"]
      )}
    >
      <div className={styles["google-auth__header"]}>
        <h2>{t("profile-page:2fa-page.title")}</h2>
        <p>{t("profile-page:2fa-page.google")}</p>
      </div>

      <div className={styles["google-auth__steps"]}>
        <GoogleDownloadStep />
        <GoogleCodeStep
          className={styles["google-auth__step--alt-color"]}
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
