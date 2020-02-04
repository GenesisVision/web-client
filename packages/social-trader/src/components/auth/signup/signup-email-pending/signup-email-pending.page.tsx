import "./signup-email-pending.scss";

import { sendConfirmationLink } from "components/auth/signup/services/signup-email-pending.service";
import SignupEmailPendingContainer from "components/auth/signup/signup-email-pending/signup-email-pending-container";
import React from "react";
import { useTranslation } from "react-i18next";

const _EmailPending: React.FC = () => {
  const [t] = useTranslation();
  return (
    <div className="signup-email">
      <h1>{t("auth.signup.email-confirm-title")}</h1>
      <p className="signup-email-pending__text">
        {t("auth.signup-email-pending.text-section")}
      </p>
      <SignupEmailPendingContainer
        sendConfirmationLink={sendConfirmationLink}
      />
    </div>
  );
};

const EmailPending = React.memo(_EmailPending);
export default EmailPending;
