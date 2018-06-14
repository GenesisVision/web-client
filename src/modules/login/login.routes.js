import { Switch, Route } from "react-router-dom";
import React from "react";

import LoginContainer from "./components/login-container/login-container";
import RecoveryCodeContainer from "./components/recovery-code-container/recovery-code-container";
import TwoFactorCodeContainer from "./components/two-factor-code-container/two-factor-code-container";

import {
  LOGIN_ROUTE,
  LOGIN_ROUTE_TWO_FACTOR_ROUTE,
  LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE
} from "./login.constants";

const LoginRoutes = () => (
  <Switch>
    <Route
      path={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}
      component={RecoveryCodeContainer}
    />
    <Route
      path={LOGIN_ROUTE_TWO_FACTOR_ROUTE}
      component={TwoFactorCodeContainer}
    />
    <Route path={LOGIN_ROUTE} component={LoginContainer} />
  </Switch>
);

export default LoginRoutes;
