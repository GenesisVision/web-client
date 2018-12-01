import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import React, { PureComponent } from "react";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import FundDetailsChartSection from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-details-chart-section";
import FundDetailsStatistic from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-statistics/fund-details-statistics";

class FundDetailsStatisticSection extends PureComponent {
  state = {
    statisticData: { data: null, isPending: true },
    profitChartData: { data: null, isPending: true },
    balanceChartData: { data: null, isPending: true },
    period: DEFAULT_PERIOD,
    prevProps: null
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.statisticData = props.statisticData;
      newState.profitChartData = props.profitChartData;
      newState.balanceChartData = props.balanceChartData;
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
    const { statisticData, profitChartData, balanceChartData } = this.state;
    const { period } = this.state;
    if (!profitChartData.data) return null;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <FundDetailsStatistic statisticData={statisticData} period={period} />
        </div>
        <div className="details-statistic-section__chart">
          <FundDetailsChartSection
            profitChartData={profitChartData}
            balanceChartData={balanceChartData}
            period={period}
            onPeriodChange={this.handlePeriodChange}
          />
        </div>
      </div>
    );
  }
}

export default FundDetailsStatisticSection;
