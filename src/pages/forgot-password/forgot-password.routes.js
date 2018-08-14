import LoginLayout from "components/login-layout/login-layout";
import ForgotPassword from "pages/forgot-password/forgot-password";
import EmailPending from "pages/forgot-password/email-pending/email-pending";
import ResetPassword from "pages/forgot-password/reset-password/reset-password";
import React from "react";
import { Route, Switch } from "react-router-dom";

export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const EMAIL_PENDING_ROUTE = `${FORGOT_PASSWORD_ROUTE}/pending`;
export const RESET_PASSWORD_ROUTE = `${FORGOT_PASSWORD_ROUTE}/reset-password`;

const ForgotPasswordRoutes = () => {
  return (
    <LoginLayout>
      <Switch>
        <Route path={EMAIL_PENDING_ROUTE} component={EmailPending} />
        <Route exact path={FORGOT_PASSWORD_ROUTE} component={ForgotPassword} />
        <Route path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
      </Switch>
    </LoginLayout>
  );
};

export default ForgotPasswordRoutes;
