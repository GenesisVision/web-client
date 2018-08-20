import "./dashboard.scss";

import React from "react";

import DashboardAssetsContainer from "./components/dashboard-assets/dashboard-assets-container";
import DashboardChartContainer from "./components/dashboard-chart/dashboard-chart-container";
import DashboardPortfolioEventsContainer from "./components/dashboard-portfolio-events/dashboard-portfolio-events-container";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__row">
        <div className="dashboard__chart">
          <DashboardChartContainer />
        </div>
        <div className="dashboard__portfolio-events">
          <DashboardPortfolioEventsContainer />
        </div>
      </div>
      <div className="dashboard__assets">
        <DashboardAssetsContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
