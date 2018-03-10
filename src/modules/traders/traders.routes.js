import { Route } from "react-router-dom";
import React from "react";

import TraderFilterableListContainer from "./components/trader-filterable-list/trader-filterable-list";

import { TRADERS_ROUTE } from "./traders.constants";

const TradersRoutes = () => (
  <Route exact path={TRADERS_ROUTE} component={TraderFilterableListContainer} />
);

export default TradersRoutes;
