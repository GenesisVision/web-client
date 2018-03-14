import React from "react";

import DashboardChartContainer from "./dashboard-chart-container/dashboard-chart-container";
import DashboardProgramListContainer from "./dashboard-program-list-container/dashboard-program-list-container";

const Dashboard = () => {
  return (
    <div>
      <DashboardChartContainer />
      <DashboardProgramListContainer />
    </div>
  );
};

export default Dashboard;
