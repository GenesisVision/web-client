import { EMAIL_CONFIRM_PENDING_ROUTE } from "modules/email-confirm/email-confirm.constants";
import AppPrivateRoute from "pages/app-routes/app-private-route";
import { AppRoute } from "pages/app-routes/app-route";
import Dashboard from "pages/dashboard/dashboard";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.constants";
import EmailConfirm from "pages/email-confirm/email-confirm";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.constants";
import ForgotPasswordRoutes from "pages/forgot-password/forgot-password.routes";
import LoginRoutes, { LOGIN_ROUTE } from "pages/login/login.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.constants";
import ProgramsRoutes from "pages/programs/programs.routes";
import ResetPassword from "pages/reset-password/reset-password";
import { RESET_PASSWORD_ROUTE } from "pages/reset-password/reset-password.constants";
import { HOME_ROUTE } from "pages/root.constants";
import Signup from "pages/signup/signup";
import { REGISTER_ROUTE } from "pages/signup/signup.constants";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotFoundPage from "./not-found/not-found";

const RootRoutes = () => (
  <Switch>
    <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
    <AppRoute path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
    <AppPrivateRoute path={DASHBOARD_ROUTE} component={Dashboard} />
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={REGISTER_ROUTE} component={Signup} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
    <Route path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
    <Route path={EMAIL_CONFIRM_PENDING_ROUTE} component={EmailConfirm} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRoutes;
