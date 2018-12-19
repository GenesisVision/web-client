import "shared/components/auth/forgot-password/forgot-password/forgot-password.scss";

import React from "react";
import { translate } from "react-i18next";
import ForgotPasswordContainer from "shared/components/auth/forgot-password/forgot-password/forgot-password-container";

import { LOGIN_ROUTE } from "../../login/login.routes";
import forgotPasswordService from "../services/forgot-password.service";

const ForgotPasswordPage = ({ t }) => {
  return (
    <div className="forgot-password">
      <p className="forgot-password__text">
        {t("auth.password-restore.forgot-password.text")}
      </p>
      <ForgotPasswordContainer
        forgotPasswordService={forgotPasswordService}
        LOGIN_ROUTE={LOGIN_ROUTE}
      />
    </div>
  );
};

export default translate()(ForgotPasswordPage);
