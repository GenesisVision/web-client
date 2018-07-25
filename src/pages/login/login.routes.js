import LoginContainer from "modules/login/components/login-container/login-container";
import RecoveryCodeContainer from "modules/login/components/recovery-code-container/recovery-code-container";
import TwoFactorCodeContainer from "modules/login/components/two-factor-code-container/two-factor-code-container";
import React from "react";
import { Route, Switch } from "react-router-dom";

export const LOGIN_ROUTE = "/login";
export const LOGIN_ROUTE_TWO_FACTOR_ROUTE = `${LOGIN_ROUTE}/two-factor`;
export const LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE = `${LOGIN_ROUTE_TWO_FACTOR_ROUTE}/recovery`;

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
