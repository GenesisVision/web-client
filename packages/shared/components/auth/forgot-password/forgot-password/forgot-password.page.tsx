import "shared/components/auth/forgot-password/forgot-password/forgot-password.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import CaptchaContainer from "./captcha-container";
import ForgotPassword from "./forgot-password";

const _ForgotPasswordPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <div className="forgot-password">
    <p className="forgot-password__text">
      {t("auth.password-restore.forgot-password.text")}
    </p>
    <CaptchaContainer
      renderForm={(handle, errorMessage) => (
        <ForgotPassword errorMessage={errorMessage} onSubmit={handle} />
      )}
    />
  </div>
);

const ForgotPasswordPage = translate()(React.memo(_ForgotPasswordPage));
export default ForgotPasswordPage;
