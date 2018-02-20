import React from "react";

import ChartContainer from "./d-chart-container/d-chart-container";
import InvestmentProgramsContainer from "./d-investment-programs-container/d-investment-program-list-container";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ChartContainer />
      <InvestmentProgramsContainer />
    </div>
  );
};

export default Dashboard;
