import React from "react";

import DashboardChartContainer from "./dashboard-chart-container/dashboard-chart-container";
import DashboardContainer from "./dashboard-container/dashboard-container";
import DashboardFilters from './dashboard-filters/dashboard-filters';

const Dashboard = () => {
  return (
    <div>
      <DashboardChartContainer />
      <DashboardFilters />
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
