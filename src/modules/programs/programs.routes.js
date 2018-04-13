import { Route } from "react-router-dom";
import React from "react";

import ProgramsFilterableListContainer from "./components/program-filterable-list/program-filterable-list";

import { PROGRAMS_ROUTE } from "./programs.constants";

const TradersRoutes = () => (
  <Route exact path={PROGRAMS_ROUTE} component={ProgramsFilterableListContainer} />
);

export default TradersRoutes;
