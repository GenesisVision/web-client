import { Route } from "react-router-dom";
import React from "react";

import ProgramContainer from "./components/trader-container/trader-container";

import { PROGRAM_ROUTE } from "./program.constants";

const ProgramRoutes = () => (
  <Route path={PROGRAM_ROUTE} component={ProgramContainer} />
);

export default ProgramRoutes;
