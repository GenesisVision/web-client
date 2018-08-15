import React from "react";
import { translate } from "react-i18next";

import "./email-pending.scss";
import EmailPendingContainer from "../../../modules/password-reset/components/email-pending-container/email-pending-container";

const EmailPending = ({ t }) => {
  return (
    <div>
      <h1 className="password-pending__title">{t("password-restore.title")}</h1>
      <p className="password-pending__text">
        {t("email-pending.text-section-1")}
      </p>
      <p className="password-pending__text">
        {t("email-pending.text-section-2")}
      </p>
      <EmailPendingContainer />
    </div>
  );
};

export default translate()(EmailPending);
