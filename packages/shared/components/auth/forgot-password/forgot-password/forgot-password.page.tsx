import "shared/components/auth/forgot-password/forgot-password/forgot-password.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import ForgotPasswordContainer from "shared/components/auth/forgot-password/forgot-password/forgot-password-container";

const _ForgotPasswordPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <div className="forgot-password">
    <p className="forgot-password__text">
      {t("auth.password-restore.forgot-password.text")}
    </p>
    <ForgotPasswordContainer />
  </div>
);

const ForgotPasswordPage = React.memo(translate()(_ForgotPasswordPage));
export default ForgotPasswordPage;
