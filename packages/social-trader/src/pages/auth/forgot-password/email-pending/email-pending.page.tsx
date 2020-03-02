import "pages/auth/forgot-password/email-pending/email-pending.scss";

import useApiRequest from "hooks/api-request.hook";
import { getEmailPendingState } from "pages/auth/auth.service";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CaptchaContainer from "../../captcha-container";
import { sendForgotPasswordEmail } from "../services/forgot-password.service";
import EmailPending from "./email-pending";

const EmailPendingPage: React.FC = () => {
  const [t] = useTranslation();
  const { email } = getEmailPendingState();
  const { sendRequest: request } = useApiRequest({
    request: values => {
      return sendForgotPasswordEmail({ ...values, email });
    },
    successMessage: "auth.password-restore.resend-email-alert-message"
  });
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
