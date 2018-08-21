import AuthLayout from "components/auth-layout/auth-layout";
import Recovery from "pages/login/recovery/recovery";
import TwoFactor from "pages/login/two-factor/two-factor";
import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginFooter from "./login-footer";
import Login from "./login-page";

export const LOGIN_ROUTE = "/login";
export const LOGIN_ROUTE_TWO_FACTOR_ROUTE = `${LOGIN_ROUTE}/two-factor`;
export const LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE = `${LOGIN_ROUTE_TWO_FACTOR_ROUTE}/recovery`;

const LoginRoutes = () => (
  <AuthLayout Footer={LoginFooter}>
    <Switch>
      <Route
        path={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}
        component={Recovery}
      />
      <Route path={LOGIN_ROUTE_TWO_FACTOR_ROUTE} component={TwoFactor} />
      <Route path={LOGIN_ROUTE} component={Login} />
    </Switch>
  </AuthLayout>
);

export default LoginRoutes;
