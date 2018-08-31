import React from "react";
import { Route } from "react-router-dom";

import DashboardPage from "./dashboard.page";

export const DASHBOARD_ROUTE = "/dashboard";
export const DASHBOARD_EVENTS_ROUTE = `${DASHBOARD_ROUTE}/portfolio-events`;

const DashboardRoutes = () => {
  return <Route path={DASHBOARD_ROUTE} component={DashboardPage} />;
};

export default DashboardRoutes;
