import { Switch, Route } from "react-router-dom";
import React from "react";

import TraderContainer from "./components/trader-container/trader-container";
import TraderListContainer from "./components/trader-list-container/trader-list-container";

import { TRADERS_ROUTE, TRADER_ROUTE } from "./traders.constants";

const TradersRoutes = () => (
  <Switch>
    <Route exact path={TRADERS_ROUTE} component={TraderListContainer} />
    <Route path={TRADER_ROUTE} component={TraderContainer} />
  </Switch>
);

export default TradersRoutes;
