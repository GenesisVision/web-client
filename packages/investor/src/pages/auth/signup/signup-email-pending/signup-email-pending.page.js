import "shared/components/auth/signup/signup-email-pending.scss";

import React from "react";
import { translate } from "react-i18next";

import SignupEmailPendingContainer from "shared/components/auth/signup/signup-email-pending/signup-email-pending-container";
import { sendConfirmationLink } from "../services/signup-email-pending.service";

const EmailPending = ({ t }) => {
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

export default translate()(EmailPending);
