import { Switch, Route } from "react-router-dom";
import React from "react";

import LoginContainer from "./components/login-container/login-container";
import RecoveryContainer from "./components/recovery-container/recovery-container";
import TwoFactorContainer from "./components/two-factor-container/two-factor-container";

import {
  LOGIN_ROUTE,
  LOGIN_ROUTE_TWO_FACTOR_ROUTE,
  LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE
} from "./login.constants";

const LoginRoutes = () => (
  <Switch>
    <Route
      path={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}
      component={RecoveryContainer}
    />
    <Route path={LOGIN_ROUTE_TWO_FACTOR_ROUTE} component={TwoFactorContainer} />
    <Route path={LOGIN_ROUTE} component={LoginContainer} />
  </Switch>
);

export default LoginRoutes;
