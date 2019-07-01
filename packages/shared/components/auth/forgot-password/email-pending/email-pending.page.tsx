import "shared/components/auth/forgot-password/email-pending/email-pending.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import CaptchaContainer from "./captcha-container";
import EmailPending from "./email-pending";

const _EmailPendingPage: React.FC<InjectedTranslateProps> = ({ t }) => (
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
      renderForm={handle => <EmailPending onSubmit={handle} />}
    />
  </div>
);

const EmailPendingPage = translate()(React.memo(_EmailPendingPage));
export default EmailPendingPage;
