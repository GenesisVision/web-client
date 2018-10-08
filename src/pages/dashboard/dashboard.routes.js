import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardPage from "./dashboard.page";
import PortfolioEventsAllComponent, {
  PORTFOLIO_EVENTS_ALL_PAGE_ROUTE
} from "./components/dashboard-portfolio-events-all/dashboard-portfolio-events-all";

export const DASHBOARD_ROUTE = "/dashboard";
export const DASHBOARD_EVENTS_ROUTE = `${DASHBOARD_ROUTE}/${PORTFOLIO_EVENTS_ALL_PAGE_ROUTE}`;

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path={DASHBOARD_ROUTE} component={DashboardPage} />
      <Route
        path={DASHBOARD_EVENTS_ROUTE}
        component={PortfolioEventsAllComponent}
      />
    </Switch>
  );
};

export default DashboardRoutes;
