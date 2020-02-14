import "pages/auth/forgot-password/email-pending/email-pending.scss";

import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AuthRootState, ReduxDispatch } from "utils/types";

import CaptchaContainer from "../../captcha-container";
import { sendForgotPasswordEmail } from "../services/forgot-password.service";
import EmailPending from "./email-pending";

const EmailPendingPage: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const request = useCallback(({ captchaCheckResult }) => {
    return dispatch(sendForgotPasswordEmail(captchaCheckResult));
  }, []);
  const email = useSelector((state: AuthRootState) => state.emailPending.email);
  return (
    <div className="password-pending">
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-1")}
      </p>
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-2")}
      </p>
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-3")}
      </p>
      <CaptchaContainer
        request={request}
        renderForm={handle => <EmailPending onSubmit={handle} email={email} />}
      />
    </div>
  );
};

export default EmailPendingPage;
