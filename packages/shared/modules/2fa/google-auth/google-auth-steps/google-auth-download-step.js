import React from "react";
import { translate } from "react-i18next";
import GooglePlay from "shared/media/badge-android.png";
import AppStore from "shared/media/badge-ios.png";

const AuthAndroidLink =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2";
const AuthIosLink =
  "https://itunes.apple.com/app/google-authenticator/id388497605";

export const GoogleStep1 = ({ t }) => {
  return (
    <div className="google-auth__step">
      <div className="google-auth__count">01</div>
      <div className="google-auth__title">{t("2fa-page.download-app")}</div>
      <a href={AuthAndroidLink} className="google-auth__link">
        <img src={GooglePlay} alt={"link to android market"} />
      </a>
      <a href={AuthIosLink} className="google-auth__link">
        <img src={AppStore} alt={"link to app store"} />
      </a>
    </div>
  );
};

const GoogleDownloadStep = translate()(GoogleStep1);

export default GoogleDownloadStep;
