import "./recovery.scss";

import React from "react";
import { translate } from "react-i18next";

import RecoveryCodeContainer from "./recovery-code/recovery-code-container";

const RecoveryPage = ({ t }) => {
  return (
    <div className="login-recovery-page">
      <h3 className="login-recovery-page__header">
        {t("auth.login.recovery.title")}
      </h3>
      <p className="login-recovery-page__text">
        {t("auth.login.recovery.text")}
      </p>
      <RecoveryCodeContainer />
    </div>
  );
};

export default translate()(RecoveryPage);
