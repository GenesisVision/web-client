import "shared/components/auth/forgot-password/email-pending/email-pending.scss";

import React from "react";
import { translate } from "react-i18next";
import EmailPendingContainer from "shared/components/auth/forgot-password/email-pending/email-pending-container";

const EmailPendingPage = ({ t }) => {
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
      <EmailPendingContainer />
    </div>
  );
};

export default translate()(EmailPendingPage);
