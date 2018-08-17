import LoginLayout from "components/login-layout/login-layout";
import EmailPending from "pages/forgot-password/email-pending/email-pending";
import ForgotPassword from "pages/forgot-password/forgot-password";
import PasswordRestore from "pages/forgot-password/password-restore/password-restore";
import React from "react";
import { Route, Switch } from "react-router-dom";

export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const EMAIL_PENDING_ROUTE = `${FORGOT_PASSWORD_ROUTE}/pending`;
export const PASSWORD_RESTORE_ROUTE = `${FORGOT_PASSWORD_ROUTE}/password-restore`;

const ForgotPasswordRoutes = () => {
  return (
    <LoginLayout>
      <Switch>
        <Route path={EMAIL_PENDING_ROUTE} component={EmailPending} />
        <Route exact path={FORGOT_PASSWORD_ROUTE} component={ForgotPassword} />
        <Route path={PASSWORD_RESTORE_ROUTE} component={PasswordRestore} />
      </Switch>
    </LoginLayout>
  );
};

export default ForgotPasswordRoutes;
