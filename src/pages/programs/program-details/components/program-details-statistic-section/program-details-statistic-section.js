import "./program-details-statistic-section.scss";

import React, { PureComponent } from "react";

import ProgramDetailsChartSection from "./program-details-chart-section/program-details-chart-section";
import ProgramDetailsStatistic from "./program-details-statistics/program-details-statistics";

class ProgramDetailsStatisticSection extends PureComponent {
  state = {
    period: 0
  };

  componentDidUpdate() {
    const { data: statistic } = this.props.statisticData;
    if (statistic && statistic.chart) {
      this.setState({ period: statistic.chart.length - 1 });
    }
  }

  render() {
    const { period } = this.state;
    const { data: statistic } = this.props.statisticData;

    if (!statistic) return null;
    const periodStatistic =
      statistic.chart.length > period ? statistic.chart[period].statistic : {};

    return (
      <div className="program-details-statistic-section">
        <div className="program-details-statistic-section__statistic">
          <ProgramDetailsStatistic
            statistic={periodStatistic}
            sharpeRatio={statistic.sharpeRatio}
          />
        </div>
        <div className="program-details-statistic-section__chart">
          <ProgramDetailsChartSection
            chart={statistic.chart}
            totalProfit={statistic.totalProfit}
            changeValue={statistic.changeValue}
          />
        </div>
      </div>
    );
  }
}

export default ProgramDetailsStatisticSection;
