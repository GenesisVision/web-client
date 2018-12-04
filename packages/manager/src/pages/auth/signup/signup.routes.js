import { HOME_ROUTE } from "pages/app/app.routes";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import React from "react";
import { translate } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";

import EmailPending from "./signup-email-pending/signup-email-pending.page";
import SignUpPage from "./signup/signup.page";

export const SIGNUP_ROUTE = "/signup";
export const SIGNUP_ROUTE_PENDING = `${SIGNUP_ROUTE}/pending`;

const SignUpRoutes = ({ t }) => (
  <AuthLayout
    Footer={SignUpFooter}
    HOME_ROUTE={HOME_ROUTE}
    LOGIN_ROUTE={LOGIN_ROUTE}
  >
    <Switch>
      <Route path={SIGNUP_ROUTE_PENDING} component={EmailPending} />
      <Route path={SIGNUP_ROUTE} component={SignUpPage} />
    </Switch>
  </AuthLayout>
);

export default translate()(SignUpRoutes);
