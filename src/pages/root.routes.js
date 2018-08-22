import AppRoutes from "pages/app/app.routes";
import SignupRoutes, { SIGNUP_ROUTE } from "pages/signup/signup.routes";
import React from "react";
import { Route, Switch } from "react-router-dom";

import ForgotPasswordRoutes, {
  FORGOT_PASSWORD_ROUTE
} from "./forgot-password/forgot-password.routes";
import LoginRoutes, { LOGIN_ROUTE } from "./login/login.routes";

export const HOME_ROUTE = "/";

const RootRoutes = () => (
  <Switch>
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={SIGNUP_ROUTE} component={SignupRoutes} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
    <Route path={HOME_ROUTE} component={AppRoutes} />
  </Switch>
);

export default RootRoutes;
