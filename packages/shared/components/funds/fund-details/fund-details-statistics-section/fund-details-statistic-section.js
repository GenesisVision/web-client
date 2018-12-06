import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import React, { PureComponent } from "react";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import FundDetailsChartSection from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-details-chart-section";
import FundDetailsStatistic from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-statistics/fund-details-statistics";

class FundDetailsStatisticSection extends PureComponent {
  state = {
    statistic: null,
    profitChart: null,
    balanceChart: null,
    period: DEFAULT_PERIOD,
    prevProps: null
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.statistic = props.statistic;
      newState.profitChart = props.profitChart;
      newState.balanceChart = props.balanceChart;
      return newState;
    }

    return state;
  }

  handlePeriodChange = period => {
    const { programId, currency, getFundStatistic } = this.props;

    getFundStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statistic, profitChart, balanceChart, period } = this.state;
    if (!profitChart) return null;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <FundDetailsStatistic statistic={statistic} period={period} />
        </div>
        <div className="details-statistic-section__chart">
          <FundDetailsChartSection
            profitChart={profitChart}
            balanceChart={balanceChart}
            period={period}
            onPeriodChange={this.handlePeriodChange}
          />
        </div>
      </div>
    );
  }
}

export default FundDetailsStatisticSection;
