import "./dashboard-chart.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";

import DashboardPortfolioChartSectionContainer from "./dashboard-portfolio-chart-section/dashboard-portfolio-chart-section-container";

class DashboardChart extends Component {
  state = {
    tab: "portfolio"
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    return (
      <Surface className="dashboard-chart">
        <div className="dashboard-chart__heading">Chart</div>
        <GVTabs value={tab} onChange={this.handleTabChange}>
          <GVTab value={"portfolio"} label="Portfolio" />
          <GVTab value={"profit"} label="Profit" />
        </GVTabs>
        {tab === "portfolio" && <DashboardPortfolioChartSectionContainer />}
      </Surface>
    );
  }
}

export default DashboardChart;
