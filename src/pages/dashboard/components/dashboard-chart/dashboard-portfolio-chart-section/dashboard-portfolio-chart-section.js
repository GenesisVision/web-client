import "./dashboard-portfolio-chart.scss";

import ChartPeriod from "components/chart-period/chart-period";
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
          changeValue={data.changeValue}
          changeValueCurrency={data.changeValueCurrency}
        />
        <ChartPeriod />
      </div>
    );
  }
}

export default DashboardPortfolioChartSection;
