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
        <h2>Chart</h2>
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
