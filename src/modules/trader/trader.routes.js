import { Route } from "react-router-dom";
import React from "react";

import TraderContainer from "../trader/components/trader-container/trader-container";

import { TRADER_ROUTE } from "./trader.constants";

const TraderRoutes = () => (
  <Route path={TRADER_ROUTE} component={TraderContainer} />
);

export default TraderRoutes;
