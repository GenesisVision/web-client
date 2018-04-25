import React from "react";
import { Route } from "react-router-dom";

import DashboardChartContainer from "./dashboard-chart-container/dashboard-chart-container";
import DashboardContainer from "./dashboard-container/dashboard-container";
import DashboardFilters from "./dashboard-filters/dashboard-filters";
import FavoritePrograms from './dashboard-favorite-programs/dashboard-favorite-programs';

const Dashboard = () => {
  return (
    <div>
      <DashboardChartContainer />
      <DashboardFilters />
      <Route exact path={`/dashboard`} component={DashboardContainer} />
      <Route
        path={"/dashboard/favorite"}
        component={FavoritePrograms}
      />
    </div>
  );
};

export default Dashboard;
