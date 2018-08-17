import "./dashboard.scss";

import DashboardAssetsContainer from "modules/dashboard/components/dashboard-assets/dashboard-assets-container";
import DashboardChartContainer from "modules/dashboard/components/dashboard-chart/dashboard-chart-container";
import DashboardPortfolioEventsContainer from "modules/dashboard/components/dashboard-portfolio-events/dashboard-portfolio-events-container";
import React from "react";

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
