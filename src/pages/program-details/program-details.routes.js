import React from "react";
import { Route } from "react-router-dom";

import ProgramDetailsPage from "./program-details.page";

export const PROGRAM_DETAILS_ROUTE = `/program-details/:programId`;

const ProgramDetailsRoutes = () => {
  return <Route path={PROGRAM_DETAILS_ROUTE} component={ProgramDetailsPage} />;
};

export default ProgramDetailsRoutes;
