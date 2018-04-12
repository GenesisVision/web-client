import { Route } from "react-router-dom";
import React from "react";

import TraderContainer from "../trader/components/trader-container/trader-container";
import TraderDepositContainer from "../program-deposit/components/program-deposit-container/program-deposit-container";
import TraderWithdrawContainer from "../trader-withdraw/components/trader-withdraw-container/trader-withdraw-container";

import {
  TRADER_ROUTE,
  TRADER_DEPOSIT_ROUTE,
  TRADER_WITHDRAW_ROUTE
} from "./trader.constants";

const TraderRoutes = () => (
  <div>
    <Route path={TRADER_ROUTE} component={TraderContainer} />
    <Route path={TRADER_DEPOSIT_ROUTE} component={TraderDepositContainer} />
    <Route path={TRADER_WITHDRAW_ROUTE} component={TraderWithdrawContainer} />
  </div>
);

export default TraderRoutes;
