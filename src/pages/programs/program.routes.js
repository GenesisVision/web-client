import React from "react";
import { Route } from "react-router-dom";

import Programs from "./programs";

//import ProgramsFilterableListContainer from "./components/program-filterable-list/program-filterable-list";

export const PROGRAMS_ROUTE = "/programs";

const ProgramsRoutes = () => (
  <Route exact path={PROGRAMS_ROUTE} component={Programs} />
);

export default ProgramsRoutes;
