import React from "react";

import ChartContainer from "./chart-container/chart-container";
import InvestmentProgramsContainer from "./investment-programs-container/investment-programs-container";

const Dashboard = () => {
  return (
    <div>
      <ChartContainer />
      <InvestmentProgramsContainer />
    </div>
  );
};

export default Dashboard;
