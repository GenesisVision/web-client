import GVqr from "components/gv-qr/gv-qr";
import {
  GoogleAuthStepAltCode,
  GoogleAuthStepContainer,
  GoogleAuthStepCount,
  GoogleAuthStepQR,
  GoogleAuthStepText,
  GoogleAuthStepTitle
} from "modules/2fa/google-auth/google-auth-steps/google-auth-steps.styles";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  mobile?: boolean;
  altColor?: boolean;
  authenticatorUri: string;
  sharedKey: string;
}

const GoogleStep2: React.FC<Props> = ({
  mobile,
  authenticatorUri,
  sharedKey,
  altColor
}) => {
  const [t] = useTranslation();
  return (
    <GoogleAuthStepContainer mobile={mobile} altColor={altColor}>
      <GoogleAuthStepCount>02</GoogleAuthStepCount>
      <GoogleAuthStepTitle>
        {t("profile-page:2fa-page.scan-code")}
      </GoogleAuthStepTitle>
      <GoogleAuthStepQR>
        <GVqr value={authenticatorUri} />
      </GoogleAuthStepQR>
      <GoogleAuthStepText>
        {t("profile-page:2fa-page.alt-code")}
      </GoogleAuthStepText>
      <GoogleAuthStepAltCode>{sharedKey}</GoogleAuthStepAltCode>
    </GoogleAuthStepContainer>
  );
};

const GoogleCodeStep = React.memo(GoogleStep2);
export default GoogleCodeStep;
