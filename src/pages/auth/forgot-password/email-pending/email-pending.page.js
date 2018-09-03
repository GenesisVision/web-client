import "./email-pending.scss";

import React from "react";
import { translate } from "react-i18next";

import EmailPendingContainer from "./components/email-pending-container";

const EmailPendingPage = ({ t }) => {
  return (
    <div>
      <h1 className="password-pending__title">
        {t("auth.password-restore.title")}
      </h1>
      <p className="password-pending__text">
        {t("auth.email-pending.text-section-1")}
      </p>
      <p className="password-pending__text">
        {t("auth.email-pending.text-section-2")}
      </p>
      <EmailPendingContainer />
    </div>
  );
};

export default translate()(EmailPendingPage);
