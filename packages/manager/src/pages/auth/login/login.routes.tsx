import { HOME_ROUTE } from "pages/app/app.routes";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import {
  LOGIN_ROUTE,
  LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE,
  LOGIN_ROUTE_TWO_FACTOR_ROUTE
} from "shared/components/auth/login/login.routes";
import LoginPage from "shared/components/auth/login/login/login.page";
import Recovery from "shared/components/auth/login/recovery/recovery.page";
import TwoFactor from "shared/components/auth/login/two-factor/two-factor.page";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";

const LoginRoutes: React.FC<InjectedTranslateProps> = ({ t }) => (
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

export default React.memo(translate()(LoginRoutes));
