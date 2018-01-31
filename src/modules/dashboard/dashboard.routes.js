import { Route } from "react-router-dom";
import React from "react";
import { DASHBOARD_ROUTE } from "./dashboard.constants";
import Dashboard from "./components/dashboard/dashboard";

const DashboardRoutes = () => (
  <Route path={DASHBOARD_ROUTE} component={Dashboard} />
);

export default DashboardRoutes;
