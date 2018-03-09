import { Switch, Route } from "react-router-dom";
import React from "react";

import TraderContainer from "./components/trader-container/trader-container";
import TraderDepositContainer from "../trader-deposit/components/trader-deposit-container/trader-deposit-container";
import TraderFilterableListContainer from "./components/trader-filterable-list/trader-filterable-list";
import TraderWithdrawContainer from "../trader-withdraw/components/trader-withdraw-container/trader-withdraw-container";

import {
  TRADERS_ROUTE,
  TRADER_ROUTE,
  TRADER_DEPOSIT_ROUTE,
  TRADER_WITHDRAW_ROUTE
} from "./traders.constants";

const TradersRoutes = () => (
  <div>
    <Switch>
      <Route path={TRADER_ROUTE} component={TraderContainer} />
      <Route path={TRADERS_ROUTE} component={TraderFilterableListContainer} />
    </Switch>
    <Route path={TRADER_DEPOSIT_ROUTE} component={TraderDepositContainer} />
    <Route path={TRADER_WITHDRAW_ROUTE} component={TraderWithdrawContainer} />
  </div>
);

export default TradersRoutes;
