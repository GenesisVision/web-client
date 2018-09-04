import React from "react";
import { translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import AuthLayout from "../components/auth-layout/auth-layout";
import LoginFooter from "../components/login-footer/login-footer";
import LoginPage from "./login/login.page";
import Recovery from "./recovery/recovery.page";
import TwoFactor from "./two-factor/two-factor.page";

export const LOGIN_ROUTE = "/login";
export const LOGIN_ROUTE_TWO_FACTOR_ROUTE = `${LOGIN_ROUTE}/two-factor`;
export const LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE = `${LOGIN_ROUTE_TWO_FACTOR_ROUTE}/recovery`;

const LoginRoutes = ({ t }) => (
  <AuthLayout Footer={LoginFooter} title={t("auth.login.title")}>
    <Switch>
      <Route
        path={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}
        component={Recovery}
      />
      <Route path={LOGIN_ROUTE_TWO_FACTOR_ROUTE} component={TwoFactor} />
      <Route path={LOGIN_ROUTE} component={LoginPage} />
    </Switch>
  </AuthLayout>
);

export default translate()(LoginRoutes);
