import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";

import DashboardFilters from "./dashboard-filters/dashboard-filters";
import FavoritePrograms from "./favourite-programs/favorite-programs";

import {
  DASHBOARD_FAVOURITES_ROUTE,
  DASHBOARD_PORTFOLIO_ROUTE,
  DASHBOARD_ROUTE
} from "../../dashboard.constants";
import Portfolio from "./portfolio/portfolio";
import "./dashboard.css";

const DashboardSections = () => (
  <Switch>
    <Redirect exact from={DASHBOARD_ROUTE} to={DASHBOARD_PORTFOLIO_ROUTE} />
    <Route path={DASHBOARD_FAVOURITES_ROUTE} component={FavoritePrograms} />
    <Route path={DASHBOARD_PORTFOLIO_ROUTE} component={Portfolio} />
  </Switch>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-subheader">Dashboard</h2>
      <DashboardFilters />
      <DashboardSections />
    </div>
  );
};

export default Dashboard;
