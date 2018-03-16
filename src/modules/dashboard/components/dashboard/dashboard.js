import React from "react";

import DashboardChartContainer from "./dashboard-chart-container/dashboard-chart-container";
import DashboardContainer from "./dashboard-container/dashboard-container";

const Dashboard = () => {
  return (
    <div>
      <DashboardChartContainer />
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
