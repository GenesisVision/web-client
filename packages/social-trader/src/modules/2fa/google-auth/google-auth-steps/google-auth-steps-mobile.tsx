import classNames from "classnames";
import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "../google-auth.module.scss";
import GoogleActivateStep from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";
import { IGoogleAuthProps } from "./google-auth-steps-desktop";

const GoogleAuth: React.FC<Props> = props => {
  const [t] = useTranslation();
  const [step, setStep] = useState(0);
  const handleNext = useCallback(() => setStep(step + 1), [step]);
  const handlePrev = useCallback(() => setStep(step - 1), [step]);

  const isPrevDisabled = () => step === 0;
  const isNextDisabled = () => step === 2;
  return (
    <div
      className={classNames(
        styles["google-auth"],
        styles["google-auth--mobile"]
      )}
    >
      {step === 0 && <GoogleDownloadStep />}
      {step === 1 && <GoogleCodeStep {...props} />}
      {step === 2 && <GoogleActivateStep {...props} />}
      <DialogButtons>
        <div className={styles["google-auth__buttons"]}>
          <GVButton
            disabled={isPrevDisabled()}
            onClick={handlePrev}
            variant="text"
          >
            <>
              &larr;&nbsp;
              {t("Prev")}
            </>
          </GVButton>
          <GVButton
            disabled={isNextDisabled()}
            onClick={handleNext}
            variant="text"
          >
            <>
              {t("Next")}
              &nbsp;&rarr;
            </>
          </GVButton>
        </div>
      </DialogButtons>
    </div>
  );
};

interface Props extends IGoogleAuthProps {}

const GoogleAuthMobile = React.memo(GoogleAuth);
export default GoogleAuthMobile;
