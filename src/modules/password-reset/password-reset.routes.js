import { Switch, Route } from "react-router-dom";
import React from "react";

import {
  FORGOT_PASSWORD_PENDING_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE
} from "./password-reset.constants";
import ForgotPasswordPending from "./components/forgot-password-pending/forgot-password-pending";
import ForgotPasswordContainer from "./components/forgot-password-container/forgot-password-container";
import ResetPasswordContainer from "./components/reset-password-container/reset-password-container";

export const ResetPasswordRoutes = () => (
  <Route path={RESET_PASSWORD_ROUTE} component={ResetPasswordContainer} />
);

export const ForgotPasswordRoutes = () => (
  <Switch>
    <Route
      path={FORGOT_PASSWORD_PENDING_ROUTE}
      component={ForgotPasswordPending}
    />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordContainer} />
  </Switch>
);
