import { Route } from "react-router-dom";
import React from "react";

import Dashboard from "./components/dashboard/dashboard";

import { DASHBOARD_ROUTE } from "./dashboard.constants";

const DashboardRoutes = () => (
  <Route path={DASHBOARD_ROUTE} component={Dashboard} />
);

export default DashboardRoutes;
