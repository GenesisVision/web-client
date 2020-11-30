import { Button } from "components/button/button";
import { DialogButtons } from "components/dialog/dialog-buttons";
import {
  GoogleAuthButtons,
  GoogleAuthStyledContainer
} from "modules/2fa/google-auth/google-auth-steps/google-auth-steps.styles";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import GoogleActivateStep from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";
import { IGoogleAuthProps } from "./google-auth-steps-desktop";

interface Props extends IGoogleAuthProps {}

const GoogleAuth: React.FC<Props> = props => {
  const [t] = useTranslation();
  const [step, setStep] = useState(0);
  const handleNext = useCallback(() => setStep(step + 1), [step]);
  const handlePrev = useCallback(() => setStep(step - 1), [step]);

  const isPrevDisabled = () => step === 0;
  const isNextDisabled = () => step === 2;
  return (
    <GoogleAuthStyledContainer>
      {step === 0 && <GoogleDownloadStep mobile />}
      {step === 1 && <GoogleCodeStep {...props} mobile />}
      {step === 2 && <GoogleActivateStep {...props} mobile />}
      <DialogButtons>
        <GoogleAuthButtons>
          <Button
            disabled={isPrevDisabled()}
            onClick={handlePrev}
            variant="text"
          >
            <>
              &larr;&nbsp;
              {t("Prev")}
            </>
          </Button>
          <Button
            disabled={isNextDisabled()}
            onClick={handleNext}
            variant="text"
          >
            <>
              {t("Next")}
              &nbsp;&rarr;
            </>
          </Button>
        </GoogleAuthButtons>
      </DialogButtons>
    </GoogleAuthStyledContainer>
  );
};

const GoogleAuthMobile = React.memo(GoogleAuth);
export default GoogleAuthMobile;
