import { Route } from "react-router-dom";
import React from "react";

import LoginContainer from "./components/loign-container";

import { LOGIN_ROUTE } from "./login.constants";

const LoginRoutes = () => (
  <Route path={LOGIN_ROUTE} component={LoginContainer} />
);

export default LoginRoutes;
