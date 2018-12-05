import { HOME_ROUTE } from "pages/app/app.routes";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";
import React from "react";
import { translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";

import LoginPage from "./login/login.page";
import Recovery from "./recovery/recovery.page";
import TwoFactor from "./two-factor/two-factor.page";

export const LOGIN_ROUTE = "/login";
export const LOGIN_ROUTE_TWO_FACTOR_ROUTE = `${LOGIN_ROUTE}/two-factor`;
export const LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE = `${LOGIN_ROUTE_TWO_FACTOR_ROUTE}/recovery`;

const LoginRoutes = ({ t }) => (
  <AuthLayout
    Footer={LoginFooter}
    title={t("auth.login.title")}
    HOME_ROUTE={HOME_ROUTE}
    SIGNUP_ROUTE={SIGNUP_ROUTE}
  >
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
