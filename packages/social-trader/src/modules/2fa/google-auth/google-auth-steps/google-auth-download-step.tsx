import ImageBaseElement from "components/avatar/image-base.element";
import GooglePlay from "media/badge-android.png";
import AppStore from "media/badge-ios.png";
import {
  GoogleAuthStepContainer,
  GoogleAuthStepCount,
  GoogleAuthStepLink,
  GoogleAuthStepTitle
} from "modules/2fa/google-auth/google-auth-steps/google-auth-steps.styles";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  mobile?: boolean;
}

const AuthAndroidLink =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2";
const AuthIosLink =
  "https://itunes.apple.com/app/google-authenticator/id388497605";

export const GoogleStep1: React.FC<Props> = ({ mobile }) => {
  const [t] = useTranslation();
  return (
    <GoogleAuthStepContainer>
      <GoogleAuthStepCount>01</GoogleAuthStepCount>
      <GoogleAuthStepTitle>
        {t("profile-page:2fa-page.download-app")}
      </GoogleAuthStepTitle>
      <GoogleAuthStepLink
        title={"link to android market"}
        href={AuthAndroidLink}
      >
        <ImageBaseElement src={GooglePlay} alt={"link to android market"} />
      </GoogleAuthStepLink>
      <GoogleAuthStepLink title={"link to app store"} href={AuthIosLink}>
        <ImageBaseElement src={AppStore} alt={"link to app store"} />
      </GoogleAuthStepLink>
    </GoogleAuthStepContainer>
  );
};

const GoogleDownloadStep = React.memo(GoogleStep1);
export default GoogleDownloadStep;
