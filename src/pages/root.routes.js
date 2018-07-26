// import LoginRoutes from "./login/login.routes";
import Login from "pages/login/login";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { LOGIN_ROUTE } from "./login/login.routes";
import NotFoundPage from "./not-found/not-found";

const RootRoutes = () => (
  <Switch>
    <Route path={LOGIN_ROUTE} component={Login} />
    <Redirect to={LOGIN_ROUTE} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRoutes;
