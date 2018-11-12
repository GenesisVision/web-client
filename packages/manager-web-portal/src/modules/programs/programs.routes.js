import { Route } from "react-router-dom";
import React from "react";

import ProgramFilterableListContainer from "./components/program-filterable-list/program-filterable-list";

import { PROGRAMS_ROUTE } from "./programs.constants";

const ProgramsRoutes = () => (
  <Route
    exact
    path={PROGRAMS_ROUTE}
    component={ProgramFilterableListContainer}
  />
);

export default ProgramsRoutes;
