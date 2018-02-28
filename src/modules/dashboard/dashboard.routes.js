import { Route } from "react-router-dom";
import React from "react";

import DashboardContainer from "./components/dashboard-container/dashboard-container";
import TraderDepositContainer from "../trader-deposit/components/trader-deposit-container/trader-deposit-container";

import {
  DASHBOARD_ROUTE,
  DASHBOARD_DEPOSIT_ROUTE
} from "./dashboard.constants";

const DashboardRoutes = () => (
  <div>
    <Route path={DASHBOARD_ROUTE} component={DashboardContainer} />
    <Route path={DASHBOARD_DEPOSIT_ROUTE} component={TraderDepositContainer} />
  </div>
);

export default DashboardRoutes;
