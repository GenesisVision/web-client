import "shared/components/auth/forgot-password/email-pending/email-pending.scss";

import React from "react";
import { translate } from "react-i18next";

import EmailPendingContainer from "shared/components/auth/forgot-password/email-pending/email-pending-container";
import forgotPasswordService from "../services/forgot-password.service";

const EmailPendingPage = ({ t }) => {
  return (
    <div className="password-pending">
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-1")}
      </p>
      <EmailPendingContainer forgotPasswordService={forgotPasswordService} />
    </div>
  );
};

export default translate()(EmailPendingPage);
