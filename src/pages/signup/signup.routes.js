import AuthLayout from "components/auth-layout/auth-layout";
import React from "react";
import { Route, Switch } from "react-router-dom";

import EmailPending from "./email-pending/email-pending";
import SignUpFooter from "./signup-footer/signup-footer";
import SignUp from "./signup-page";

export const SIGNUP_ROUTE = "/signup";
export const SIGNUP_ROUTE_PENDING = `${SIGNUP_ROUTE}/pending`;

const SignUpRoutes = () => (
  <AuthLayout Footer={SignUpFooter}>
    <Switch>
      <Route path={SIGNUP_ROUTE_PENDING} component={EmailPending} />
      <Route path={SIGNUP_ROUTE} component={SignUp} />
    </Switch>
  </AuthLayout>
);

export default SignUpRoutes;
