import { EMAIL_CONFIRM_PENDING_ROUTE } from "pages/email-confirm/email-confirm.routes";
import EmailConfirmRoutes from "pages/email-confirm/email-confirm.routes";
import ForgotPasswordRoutes, {
  FORGOT_PASSWORD_ROUTE
} from "pages/forgot-password/forgot-password.routes";
import LoginRoutes, { LOGIN_ROUTE } from "pages/login/login.routes";
import SignupRoutes, { SIGNUP_ROUTE } from "pages/signup/signup.routes";
import React from "react";
import { Route, Switch } from "react-router-dom";

import AppRoutes from "./app.routes";

export const HOME_ROUTE = "/";

const RootRoutes = () => (
  <Switch>
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={SIGNUP_ROUTE} component={SignupRoutes} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
    <Route path={EMAIL_CONFIRM_PENDING_ROUTE} component={EmailConfirmRoutes} />
    <Route path={HOME_ROUTE} component={AppRoutes} />
  </Switch>
);

export default RootRoutes;
