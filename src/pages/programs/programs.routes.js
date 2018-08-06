import { PROGRAMS_ROUTE } from "pages/programs/programs.constants";
import React from "react";
import { Route } from "react-router-dom";

import Programs from "./programs";

const ProgramsRoutes = () => (
  <Route exact path={PROGRAMS_ROUTE} component={Programs} />
);

export default ProgramsRoutes;
