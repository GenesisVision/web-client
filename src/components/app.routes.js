import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";

import NotFoundPage, {
  NOT_FOUND_PAGE_ROUTE
} from "../shared/components/not-found/not-found";
import PrivateRoute from "../shared/components/private-route/private-route";

import { DASHBOARD_ROUTE } from "../modules/dashboard/dashboard.constants";
import { HOME_ROUTE } from "./app.constants";
import { LOGIN_ROUTE } from "../modules/login/login.constants";
import { PROFILE_ROUTE } from "../modules/profile/profile.constants";
import { PROGRAMS_ROUTE } from "../modules/programs/programs.constants";
import { REGISTER_ROUTE } from "../modules/register/register.constants";
import { WALLET_ROUTE } from "../modules/wallet/wallet.constants";

import {
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE
} from "../modules/password-reset/password-reset.constants";
import {
  ForgotPasswordRoutes,
  ResetPasswordRoutes
} from "../modules/password-reset/password-reset.routes";
import { PROGRAM_ROUTE } from "../modules/program/program.constants";
import DashboardRoutes from "../modules/dashboard/dashboard.routes";
import LoginRoutes from "../modules/login/login.routes";
import ProfileRoutes from "../modules/profile/profile.routes";
import RegisterRoutes from "../modules/register/register.routes";
import ProgramRoutes from "../modules/program/program.routes";
import ProgramsRoutes from "../modules/programs/programs.routes";
import WalletRoutes from "../modules/wallet/wallet.routes";
import { EMAIL_CONFIRM_ROUTE } from "../modules/email-confirm/email-confirm.constants";
import EmailConfirmRoutes from "../modules/email-confirm/email-confirm.routes";
import { TOURNAMENT_ROUTE } from "../modules/tournament/tournament.constants";
import TournamentRoutes from "../modules/tournament/tournament.routes";

const AppRoutes = () => (
  <Switch>
    <Route path={EMAIL_CONFIRM_ROUTE} component={EmailConfirmRoutes} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
    <Route path={RESET_PASSWORD_ROUTE} component={ResetPasswordRoutes} />
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={REGISTER_ROUTE} component={RegisterRoutes} />
    <Route path={PROGRAM_ROUTE} component={ProgramRoutes} />
    <Route path={TOURNAMENT_ROUTE} component={TournamentRoutes} />
    <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
    <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
    <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
    <PrivateRoute path={WALLET_ROUTE} component={WalletRoutes} />
    <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
