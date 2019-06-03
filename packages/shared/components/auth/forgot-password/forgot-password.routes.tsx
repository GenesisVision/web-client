import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";

import EmailPendingPage from "./email-pending/email-pending.page";
import ForgotPasswordPage from "./forgot-password/forgot-password.page";
import PasswordRestorePage from "./password-restore/password-restore.page";

export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const EMAIL_PENDING_ROUTE = `${FORGOT_PASSWORD_ROUTE}/email-pending`;
export const PASSWORD_RESTORE_ROUTE = `${FORGOT_PASSWORD_ROUTE}/restore`;

const _ForgotPasswordRoutes: React.FC<InjectedTranslateProps> = ({ t }) => (
  <AuthLayout
    Footer={LoginFooter}
    title={t("auth.password-restore.title")}
    SIGNUP_ROUTE={SIGNUP_ROUTE}
  >
    <Switch>
      <Route path={EMAIL_PENDING_ROUTE} component={EmailPendingPage} />
      <Route path={PASSWORD_RESTORE_ROUTE} component={PasswordRestorePage} />
      <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordPage} />
    </Switch>
  </AuthLayout>
);

const ForgotPasswordRoutes = React.memo(translate()(_ForgotPasswordRoutes));
export default ForgotPasswordRoutes;
