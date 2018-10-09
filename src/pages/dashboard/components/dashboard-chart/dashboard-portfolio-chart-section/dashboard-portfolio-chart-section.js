import "./dashboard-portfolio-chart-section.scss";

import ChartPeriod from "components/chart/chart-period/chart-period";
import { DEFAULT_PERIOD } from "components/chart/chart-period/chart-period.helpers";
import React, { PureComponent } from "react";

import DashboardPortfolioChart from "./dashboard-portfolio-chart";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

const composeBalanceChartData = balanceChart => {
  const balance = balanceChart.map(x => ({
    date: x.date.getTime(),
    balance: x.value
  }));
  return balance;
};

const composeAssetsChartData = assetsChart => {
  const assets = assetsChart.map(x => {
    let assetsCount = 0;
    const newAsset = {
      date: x.date.getTime(),
      value: x.value
    };
    x.topAssets.forEach(asset => {
      newAsset[`asset${assetsCount++}`] = {
        value: asset.value,
        asset
      };
    });
    if (x.otherAssetsValue.amount > 0) {
      newAsset[`asset${assetsCount}`] = {
        value: x.otherAssetsValue.value,
        asset: {
          title: "Others",
          value: x.otherAssetsValue.value,
          changePercent: x.otherAssetsValue.changePercent,
          changeValue: x.otherAssetsValue.changeValue
        }
      };
    }

    return newAsset;
  });

  return assets;
};
class DashboardPortfolioChartSection extends PureComponent {
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
    if (data === undefined) return null;
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
            assets={composeAssetsChartData(data.investedProgramsInfo)}
            balance={composeBalanceChartData(data.balanceChart)}
          />
        </div>
      </div>
    );
  }
}

export default DashboardPortfolioChartSection;
