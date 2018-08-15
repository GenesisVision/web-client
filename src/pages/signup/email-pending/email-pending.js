import React from "react";
import { translate } from "react-i18next";

import "./email-pending.scss";
import EmailPendingContainer from "modules/register-form/components/signup-email-pending-container/signup-email-pending-container";

const EmailPending = ({ t }) => {
  return (
    <div className="signup-email">
      <h1 className="signup-email-pending__title">
        {t("auth.signup.email-confirm-title")}
      </h1>
      <p className="signup-email-pending__text">
        {t("email-pending.text-section-1")}
      </p>
      <p className="signup-email-pending__text">
        {t("email-pending.text-section-2")}
      </p>
      <EmailPendingContainer />
    </div>
  );
};

export default translate()(EmailPending);
