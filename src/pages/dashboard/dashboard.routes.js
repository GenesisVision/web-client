import React from "react";
import { Route } from "react-router-dom";

import DashboardPage from "./dashboard.page";

export const DASHBOARD_ROUTE = "/dashboard";

const DashboardRoutes = () => {
  return <Route path={DASHBOARD_ROUTE} component={DashboardPage} />;
};

export default DashboardRoutes;
