import LoginLayout from "components/login-layout/login-layout";
import ForgotPassword from "pages/forgot-password/forgot-password";
import {
  FORGOT_PASSWORD_PENDING_ROUTE,
  FORGOT_PASSWORD_ROUTE
} from "pages/forgot-password/forgot-password.constants";
import ResetPasswordPending from "pages/forgot-password/pending/pending";
import React from "react";
import { Route, Switch } from "react-router-dom";

const ForgotPasswordRoutes = () => {
  return (
    <LoginLayout>
      <Switch>
        <Route
          path={FORGOT_PASSWORD_PENDING_ROUTE}
          component={ResetPasswordPending}
        />
        <Route exact path={FORGOT_PASSWORD_ROUTE} component={ForgotPassword} />
      </Switch>
    </LoginLayout>
  );
};

export default ForgotPasswordRoutes;
