import LoginLayout from "components/login-layout/login-layout";
import React from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "./signup-page";
import EmailPending from "./email-pending/email-pending";

export const REGISTER_ROUTE = "/signup";
export const REGISTER_ROUTE_PENDING = `${REGISTER_ROUTE}/pending`;

const LoginRoutes = () => (
  <LoginLayout>
    <Switch>
      <Route path={REGISTER_ROUTE_PENDING} component={EmailPending} />
      <Route path={REGISTER_ROUTE} component={SignUp} />
    </Switch>
  </LoginLayout>
);

export default LoginRoutes;
