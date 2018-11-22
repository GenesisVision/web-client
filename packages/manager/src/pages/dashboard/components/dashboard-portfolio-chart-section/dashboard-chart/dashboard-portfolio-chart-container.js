import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FundProfitChart from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import { getAssetChart } from "../../../services/dashboard.service";

class DashboardPortfolioChartContainer extends PureComponent {
  state = {
    period: DEFAULT_PERIOD
  };

  componentDidMount() {
    const { assets } = this.props;

    if (assets !== null) {
      const { programs, funds } = assets;
      const assetProgram = programs.length ? programs[0] : null;
      const assetFund = funds.length ? funds[0] : null;
      if (assetProgram) {
        this.props.service.getAssetChart(
          assetProgram.id,
          assetProgram.title,
          "Program",
          this.state.period
        );
      } else if (assetFund) {
        this.props.service.getAssetChart(
          assetFund.id,
          assetFund.title,
          "Fund",
          this.state.period
        );
      }
    }
  }

  handleChangePeriod = period => {
    this.props.service.getAssetChart(
      this.props.assetChart.id,
      this.props.assetChart.title,
      this.props.assetChart.type,
      period
    );
    this.setState({ period });
  };

  render() {
    const { assetChart, currency } = this.props;
    const { period } = this.state;
    if (!assetChart || assetChart.isPending) return null;
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
  const { assetChart } = state.dashboard;
  const { currency } = state.accountSettings;
  const { programs, funds } = state.dashboard;
  return {
    assetChart,
    currency,
    programsData: programs.itemsData.data,
    fundsData: funds.itemsData.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getAssetChart }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPortfolioChartContainer);
