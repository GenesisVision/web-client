import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthLayout from "../components/auth-layout/auth-layout";
import SignUpFooter from "../components/signup-footer/signup-footer";
import EmailPending from "./signup-email-pending/signup-email-pending.page";
import SignUpPage from "./signup/signup.page";

export const SIGNUP_ROUTE = "/signup";
export const SIGNUP_ROUTE_PENDING = `${SIGNUP_ROUTE}/pending`;

const SignUpRoutes = () => (
  <AuthLayout Footer={SignUpFooter}>
    <Switch>
      <Route path={SIGNUP_ROUTE_PENDING} component={EmailPending} />
      <Route path={SIGNUP_ROUTE} component={SignUpPage} />
    </Switch>
  </AuthLayout>
);

export default SignUpRoutes;
