import "shared/components/auth/signup/signup-email-pending.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { sendConfirmationLink } from "shared/components/auth/signup/services/signup-email-pending.service";
import SignupEmailPendingContainer from "shared/components/auth/signup/signup-email-pending/signup-email-pending-container";

const _EmailPending: React.FC<WithTranslation> = ({ t }) => {
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

const EmailPending = translate()(React.memo(_EmailPending));
export default EmailPending;
