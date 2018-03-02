import { Route } from "react-router-dom";
import React from "react";

import { REGISTER_ROUTE } from "./register.constants";

import registerContainer from "./components/register-container";

const RegisterRoutes = () => (
  <Route path={REGISTER_ROUTE} component={registerContainer} />
);

export default RegisterRoutes;
