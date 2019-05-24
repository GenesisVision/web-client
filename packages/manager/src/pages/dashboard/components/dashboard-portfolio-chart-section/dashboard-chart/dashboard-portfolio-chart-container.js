import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import {
  DashboardChartDescriptionLoader,
  DashboardChartLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import FundProfitChart from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import withLoader from "shared/decorators/with-loader";

import { getAssetChart, setPeriod } from "../../../services/dashboard.service";

class _DashboardPortfolioChartContainer extends PureComponent {
  handleChangePeriod = period => {
    const { service, assetChart } = this.props;
    service.setPeriod(period);
    service.getAssetChart(assetChart.id, assetChart.title, assetChart.type);
  };

  render() {
    const { assetChart, currency, period } = this.props;

    if (!assetChart)
      return (
        <Fragment>
          <DashboardChartDescriptionLoader />
          <DashboardChartLoader />
        </Fragment>
      );
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

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getAssetChart, setPeriod }, dispatch)
  };
};

const DashboardPortfolioChartContainer = compose(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  )
)(_DashboardPortfolioChartContainer);
export default DashboardPortfolioChartContainer;
