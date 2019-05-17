import "shared/components/auth/forgot-password/email-pending/email-pending.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import EmailPendingContainer from "shared/components/auth/forgot-password/email-pending/email-pending-container";

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
    <EmailPendingContainer />
  </div>
);

const EmailPendingPage = React.memo(translate()(_EmailPendingPage));
export default EmailPendingPage;
