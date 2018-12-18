import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import FundProfitChart from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";

import {
  composeAssetChart,
  getAssetChart,
  setPeriod
} from "../../../services/dashboard.service";
import DashboardChartLoader
  from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loader";

class DashboardPortfolioChartContainer extends PureComponent {
  componentDidMount() {
    const { service } = this.props;
    service.composeAssetChart();
  }

  handleChangePeriod = period => {
    const { service, assetChart } = this.props;
    service.setPeriod(period);
    service.getAssetChart(assetChart.id, assetChart.title, assetChart.type);
  };

  render() {
    const { assetChart, currency, period } = this.props;
    if (!assetChart)
      return <DashboardChartLoader />;
    if (!assetChart) return null;
    return (
      <Fragment>
        <h3 className="dashboard-portfolio-chart-section__heading">
          {assetChart.title}
        </h3>
        <ChartPeriod period={period} onChange={this.handleChangePeriod} />
        <div className="dashboard-portfolio-chart-section__chart">
          {assetChart.type === "Program" && (
            <ProgramProfitChart
              equityChart={assetChart.equityChart}
              pnlChart={assetChart.pnLChart}
              currency={currency}
              period={period}
            />
          )}
          {assetChart.type === "Fund" && (
            <FundProfitChart
              equityChart={assetChart.equityChart}
              currency={currency}
              period={period}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { assetChart, period } = state.dashboard;
  const { currency } = state.accountSettings;
  const { programs, funds } = state.dashboard;
  console.log(state.dashboard);
  return {
    assetChart,
    period,
    currency,
    programsData: programs.itemsData.data,
    fundsData: funds.itemsData.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      { getAssetChart, composeAssetChart, setPeriod },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPortfolioChartContainer);
