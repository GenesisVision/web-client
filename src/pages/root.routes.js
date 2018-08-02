import Login from "pages/login/login";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { LOGIN_ROUTE } from "./login/login.routes";
import NotFoundPage from "./not-found/not-found";
import ProgramsRoutes, { PROGRAMS_ROUTE } from "./programs/program.routes";
import Programs from "./programs/programs";

const RootRoutes = () => (
  <Switch>
    <Route path={LOGIN_ROUTE} component={Login} />
    <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
    <Redirect from="/" to={PROGRAMS_ROUTE} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRoutes;
