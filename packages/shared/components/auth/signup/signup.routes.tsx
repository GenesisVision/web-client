import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import EmailPending from "shared/components/auth/signup/signup-email-pending/signup-email-pending.page";
import SignUpPage from "shared/components/auth/signup/signup.page";
import { SIGNUP_ROUTE } from "shared/routes/app.routes";

export const SIGNUP_ROUTE_PENDING = `${SIGNUP_ROUTE}/pending`;

const _SignUpRoutes: React.FC<InjectedTranslateProps> = ({ t }) => (
  <AuthLayout
    title={t("auth.signup.title")}
    Footer={SignUpFooter}
    LOGIN_ROUTE={LOGIN_ROUTE}
  >
    <Switch>
      <Route path={SIGNUP_ROUTE_PENDING} component={EmailPending} />
      <Route path={SIGNUP_ROUTE} component={SignUpPage} />
    </Switch>
  </AuthLayout>
);

const SignUpRoutes = translate()(React.memo(_SignUpRoutes));
export default SignUpRoutes;
