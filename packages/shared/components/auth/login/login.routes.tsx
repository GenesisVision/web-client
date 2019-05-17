import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import LoginPage from "shared/components/auth/login/login/login.page";
import Recovery from "shared/components/auth/login/recovery/recovery.page";
import TwoFactor from "shared/components/auth/login/two-factor/two-factor.page";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";

export const LOGIN_ROUTE = "/login";
export const LOGIN_ROUTE_TWO_FACTOR_ROUTE = `${LOGIN_ROUTE}/two-factor`;
export const LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE = `${LOGIN_ROUTE_TWO_FACTOR_ROUTE}/recovery`;
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";

const LoginRoutes: React.FC<InjectedTranslateProps> = ({ t }) => (
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

export default React.memo(translate()(LoginRoutes));
