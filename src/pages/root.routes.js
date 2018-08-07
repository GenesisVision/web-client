import AppRoutes from "pages/app/app.routes";
import { EMAIL_CONFIRM_PENDING_ROUTE } from "pages/email-confirm/email-confirm.routes";
import EmailConfirmRoutes from "pages/email-confirm/email-confirm.routes";
import React from "react";
import { Route, Switch } from "react-router-dom";

import ForgotPasswordRoutes, {
  FORGOT_PASSWORD_ROUTE
} from "./forgot-password/forgot-password.routes";
import LoginRoutes, { LOGIN_ROUTE } from "./login/login.routes";
import ResetPassword, {
  RESET_PASSWORD_ROUTE
} from "./reset-password/reset-password";
import Signup, { REGISTER_ROUTE } from "./signup/signup";

export const HOME_ROUTE = "/";

const RootRoutes = () => (
  <Switch>
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={REGISTER_ROUTE} component={Signup} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
    <Route path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
    <Route path={EMAIL_CONFIRM_PENDING_ROUTE} component={EmailConfirmRoutes} />
    <Route path={HOME_ROUTE} component={AppRoutes} />
  </Switch>
);

export default RootRoutes;
