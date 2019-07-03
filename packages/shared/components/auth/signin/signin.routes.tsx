import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

import LoginPage from "./login/login.page";
import Recovery from "./recovery/recovery.page";
import TwoFactor from "./two-factor/two-factor.page";

export const LOGIN_ROUTE_TWO_FACTOR_ROUTE = `${LOGIN_ROUTE}/two-factor`;
export const LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE = `${LOGIN_ROUTE_TWO_FACTOR_ROUTE}/recovery`;
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";

const _SignInRoutes: React.FC<InjectedTranslateProps> = ({ t }) => (
  <AuthLayout
    Footer={LoginFooter}
    title={t("auth.login.title")}
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

const SignInRoutes = translate()(React.memo(_SignInRoutes));
export default SignInRoutes;
