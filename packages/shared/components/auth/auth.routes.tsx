import * as React from "react";
import { Route, Switch } from "react-router-dom";
import EmailConfirmPage, {
  EMAIL_CONFIRM_ROUTE
} from "shared/components/auth/email-confirm/email-confirm.page";
import ForgotPasswordRoutes, {
  FORGOT_PASSWORD_ROUTE
} from "shared/components/auth/forgot-password/forgot-password.routes";
import SignupRoutes from "shared/components/auth/signup/signup.routes";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

import LoginRoutes from "./login/login.routes";

export const AUTH_ROUTES_REGEX = `(${LOGIN_ROUTE}|${SIGNUP_ROUTE}|${FORGOT_PASSWORD_ROUTE}|${EMAIL_CONFIRM_ROUTE})`;

const _AuthRoutes = () => (
  <Switch>
    <Route path={EMAIL_CONFIRM_ROUTE} component={EmailConfirmPage} />
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={SIGNUP_ROUTE} component={SignupRoutes} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
  </Switch>
);

const AuthRoutes = React.memo(_AuthRoutes);
export default AuthRoutes;
