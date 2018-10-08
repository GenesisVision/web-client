import "./dashboard-portfolio-chart-section.scss";

import ChartPeriod from "components/chart/chart-period/chart-period";
import { DEFAULT_PERIOD } from "components/chart/chart-period/chart-period.helpers";
import moment from "moment";
import React, { Component } from "react";

import DashboardPortfolioChart from "./dashboard-portfolio-chart";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

// const composeChartData = (chart, bars) => {
//   const data = [
//     ...chart.map(x => ({ profitValue: x.value, date: x.date.getTime() })),
//     ...bars.map(x => ({
//       assetValue: x.value,
//       assets: x.assets,
//       date: moment(x.date)
//         .startOf("day")
//         .valueOf()
//     }))
//   ];

//   return data.sort((a, b) => {
//     return a.date - b.date;
//   });
// };
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
          <DashboardPortfolioChart
            assetsChart={data.bars}
            balanceChart={data.chart}
          />
        </div>
      </div>
    );
  }
}

export default DashboardPortfolioChartSection;
