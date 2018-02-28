import { Route } from "react-router-dom";
import React from "react";

import DashboardContainer from "./components/dashboard-container/dashboard-container";
import TraderDepositContainer from "../trader-deposit/components/trader-deposit-container/trader-deposit-container";
import TraderWithdrawContainer from "../trader-withdraw/components/trader-withdraw-container/trader-withdraw-container";

import {
  DASHBOARD_ROUTE,
  DASHBOARD_DEPOSIT_ROUTE,
  DASHBOARD_WITHDRAW_ROUTE
} from "./dashboard.constants";

const DashboardRoutes = () => (
  <div>
    <Route path={DASHBOARD_ROUTE} component={DashboardContainer} />
    <Route path={DASHBOARD_DEPOSIT_ROUTE} component={TraderDepositContainer} />
    <Route
      path={DASHBOARD_WITHDRAW_ROUTE}
      component={TraderWithdrawContainer}
    />
  </div>
);

export default DashboardRoutes;
