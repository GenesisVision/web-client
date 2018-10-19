import "./dashboard-portfolio-chart-section.scss";

import Surface from "components/surface/surface";
import React, { Component } from "react";

import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardInRequestsContainer from "./dashboard-in-requests/dashboard-in-requests-container";

class DashboardPortfolioChartSection extends Component {
  render() {
    return (
      <Surface className="dashboard-portfolio-chart-section">
        <div className="dashboard-portfolio-chart-section__heading">Chart</div>
        <DashboardInRequestsContainer />
        <DashboardPortfolioChartContainer />
      </Surface>
    );
  }
}

export default DashboardPortfolioChartSection;
