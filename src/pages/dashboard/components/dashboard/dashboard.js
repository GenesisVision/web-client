import "./dashboard.css";

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  DASHBOARD_FAVOURITES_ROUTE,
  DASHBOARD_PORTFOLIO_ROUTE,
  DASHBOARD_ROUTE
} from "../../dashboard.constants";
import DashboardFilters from "./dashboard-filters/dashboard-filters";
import FavoritePrograms from "./favourite-programs/favorite-programs";
import Portfolio from "./portfolio/portfolio";

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
