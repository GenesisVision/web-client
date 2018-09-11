import "./dashboard-portfolio-chart.scss";

import React, { Component } from "react";

import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

class DashboardPortfolioChartSection extends Component {
  componentDidMount() {
    this.props.service.getPortfolioChart();
  }
  render() {
    const { data, isPending, currency } = this.props;
    return (
      <div>
        <DashboardPortfolioChartStat
          currency={currency}
          value={data.value}
          valueCurrency={data.valueCurrency}
        />
        <div>Chart</div>
      </div>
    );
  }
}

export default DashboardPortfolioChartSection;
