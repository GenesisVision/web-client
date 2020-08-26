import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import withReduxStore from "decorators/with-redux-store";
import SignupContainer from "pages/auth/signup/signup-container";
import { getRefCode, getReferrer, getUtm } from "pages/landing-page/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { initializeStore } from "store";

const _SignupPopupContainer: React.FC = () => {
  const [t] = useTranslation();
  const referralCode = getRefCode();
  const utmSource = getUtm();
  const referrer = getReferrer();
  return (
    <>
      <DialogTop title={t("auth:signup.title")} />
      <DialogBottom>
        <SignupContainer
          showLogin
          referralCode={referralCode}
          utmSource={utmSource}
          referrer={referrer}
        />
      </DialogBottom>
    </>
  );
};

export const SignupPopupContainer = withReduxStore(initializeStore)(
  _SignupPopupContainer
);
