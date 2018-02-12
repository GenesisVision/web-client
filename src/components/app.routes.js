import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";

import LoginScene from "./login-scene/login-scene";
import NotFoundPage from "../shared/components/not-found/not-found";
import PrivateRoute from "../shared/components/private-route/private-route";
import RegisterScene from "./register-scene/register-scene";
import routes from "../utils/constants/routes";

import { DASHBOARD_ROUTE } from "../modules/dashboard/dashboard.constants";
import { PROFILE_ROUTE } from "../modules/profile/profile.constants";
import { TRADERS_ROUTE } from "../modules/traders/traders.constants";
import DashboardRoutes from "../modules/dashboard/dashboard.routes";
import ProfileRoutes from "../modules/profile/profile.routes";
import TradersRoutes from "../modules/traders/traders.routes";

const AppRoutes = () => (
  <Switch>
    <Route path={routes.login} component={LoginScene} />
    <Route path={routes.signup} component={RegisterScene} />
    <Route path={TRADERS_ROUTE} component={TradersRoutes} />
    <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
    <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
    <Route
      exact
      path={routes.index}
      render={() => <Redirect to={TRADERS_ROUTE} />}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
