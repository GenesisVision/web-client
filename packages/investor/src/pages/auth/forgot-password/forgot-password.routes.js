import React from "react";
import { translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import EmailPendingPage from "./email-pending/email-pending.page";
import ForgotPasswordPage from "./forgot-password/forgot-password.page";
import PasswordRestore from "./password-restore/password-restore";
import { HOME_ROUTE } from "pages/app/app.routes";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";

export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const EMAIL_PENDING_ROUTE = `${FORGOT_PASSWORD_ROUTE}/email-pending`;
export const PASSWORD_RESTORE_ROUTE = `${FORGOT_PASSWORD_ROUTE}/restore`;

const ForgotPasswordRoutes = ({ t }) => {
  return (
    <AuthLayout Footer={LoginFooter} title={t("auth.password-restore.title")} HOME_ROUTE={HOME_ROUTE} SIGNUP_ROUTE={SIGNUP_ROUTE}>
      <Switch>
        <Route path={EMAIL_PENDING_ROUTE} component={EmailPendingPage} />
        <Route path={PASSWORD_RESTORE_ROUTE} component={PasswordRestore} />
        <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordPage} />
      </Switch>
    </AuthLayout>
  );
};

export default translate()(ForgotPasswordRoutes);
