import "./forgot-password.scss";

import ForgotPasswordContainer from "modules/password-reset/components/forgot-password-container/forgot-password-container";
import React from "react";
import { translate } from "react-i18next";

const ForgotPassword = ({ t }) => {
  return (
    <div className="forgot-password">
      <h1 className="forgot-password__title">
        {t("auth.password-restore.title")}
      </h1>
      <p className="forgot-password__text">
        {t("auth.password-restore.forgot-password.text")}
      </p>
      <ForgotPasswordContainer />
    </div>
  );
};

export default translate()(ForgotPassword);
