import "./program-details-statistic-section.scss";

import React, { PureComponent } from "react";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";

import ProgramDetailsChartSection from "./program-details-chart-section/program-details-chart-section";
import ProgramDetailsStatistic from "./program-details-statistics/program-details-statistics";

class ProgramDetailsStatisticSection extends PureComponent {
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
    const { programId, currency, getProgramStatistic } = this.props;

    getProgramStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statistic, profitChart, balanceChart } = this.state;
    const { period } = this.state;
    if (!profitChart) return null;
    return (
      <div className="program-details-statistic-section">
        <div className="program-details-statistic-section__statistic">
          <ProgramDetailsStatistic
            statistic={statistic}
            profitChart={profitChart}
            period={period}
          />
        </div>
        <div className="program-details-statistic-section__chart">
          <ProgramDetailsChartSection
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

export default ProgramDetailsStatisticSection;
