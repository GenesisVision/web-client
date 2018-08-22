import AuthLayout from "components/layout/auth-layout/auth-layout";
import React from "react";
import { Route, Switch } from "react-router-dom";

import EmailPending from "./email-pending/email-pending";
import ForgotPassword from "./forgot-password";
import ForgotPasswordFooter from "./forgot-password-footer";
import PasswordRestore from "./password-restore/password-restore";

export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const EMAIL_PENDING_ROUTE = `${FORGOT_PASSWORD_ROUTE}/pending`;
export const PASSWORD_RESTORE_ROUTE = `${FORGOT_PASSWORD_ROUTE}/password-restore`;

const ForgotPasswordRoutes = () => {
  return (
    <AuthLayout Footer={ForgotPasswordFooter}>
      <Switch>
        <Route path={EMAIL_PENDING_ROUTE} component={EmailPending} />
        <Route exact path={FORGOT_PASSWORD_ROUTE} component={ForgotPassword} />
        <Route path={PASSWORD_RESTORE_ROUTE} component={PasswordRestore} />
      </Switch>
    </AuthLayout>
  );
};

export default ForgotPasswordRoutes;
