import { Route } from "react-router-dom";
import React from "react";

import TraderContainer from "../trader/components/trader-container/trader-container";

import { PROGRAM_ROUTE } from "./trader.constants";

const TraderRoutes = () => (
  <Route path={PROGRAM_ROUTE} component={TraderContainer} />
);

export default TraderRoutes;
