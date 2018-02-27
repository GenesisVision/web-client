import { Route } from "react-router-dom";
import React from "react";
import { DASHBOARD_ROUTE } from "./dashboard.constants";
import DashboardContainer from "./components/dashboard-container/dashboard-container";

const DashboardRoutes = () => (
  <Route path={DASHBOARD_ROUTE} component={DashboardContainer} />
);

export default DashboardRoutes;
