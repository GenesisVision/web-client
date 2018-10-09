import "./dashboard-portfolio-chart-section.scss";

import ChartPeriod from "components/chart/chart-period/chart-period";
import { DEFAULT_PERIOD } from "components/chart/chart-period/chart-period.helpers";
import React, { Component } from "react";

import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

class DashboardPortfolioChartSection extends Component {
  state = {
    period: DEFAULT_PERIOD
  };

  componentDidMount() {
    const { period } = this.state;
    this.props.service.getPortfolioChart(period.start, period.end);
  }

  handleChangePeriod = period => {
    this.props.service.getPortfolioChart(period.start, period.end);
    this.setState({ period });
  };

  render() {
    const { data, currency } = this.props;
    const { period } = this.state;
    if (data.chart === undefined) return null;
    return (
      <div className="dashboard-portfolio-chart-section">
        <DashboardPortfolioChartStat
          currency={currency}
          value={data.value}
          valueCurrency={data.valueCurrency}
          changeValue={data.changeValue}
          changeValueCurrency={data.changeValueCurrency}
        />
        <ChartPeriod period={period} onChange={this.handleChangePeriod} />
        <div className="dashboard-portfolio-chart-section__chart">
          {/* <DashboardPortfolioChart
            data={composeChartData(data.chart, data.bars)}
          /> */}
        </div>
      </div>
    );
  }
}

export default DashboardPortfolioChartSection;
