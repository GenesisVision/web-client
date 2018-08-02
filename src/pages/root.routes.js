import { DASHBOARD_ROUTE } from "modules/dashboard/dashboard.constants";
import AppPrivateRoute from "pages/app-routes/app-private-route";
import { AppRoute } from "pages/app-routes/app-route";
import Dashboard from "pages/dashboard/dashboard";
import Login from "pages/login/login";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { LOGIN_ROUTE } from "./login/login.routes";
import NotFoundPage from "./not-found/not-found";
import ProgramsRoutes, { PROGRAMS_ROUTE } from "./programs/program.routes";

const RootRoutes = () => (
  <Switch>
    <Route path={LOGIN_ROUTE} component={Login} />
    <AppRoute path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
    <AppPrivateRoute path={DASHBOARD_ROUTE} component={Dashboard} />
    <Redirect from="/" to={PROGRAMS_ROUTE} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRoutes;
