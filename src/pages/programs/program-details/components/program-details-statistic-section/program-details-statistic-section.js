import "./program-details-statistic-section.scss";

import ChartPeriod from "components/chart/chart-period/chart-period";
import Surface from "components/surface/surface";
import React, { PureComponent } from "react";

import ProgramDetailsChart from "./program-details-chart/program-details-chart";
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

    return (
      <div className="program-details-statistic-section">
        <Surface className="program-details-statistic-section__statistic">
          <ProgramDetailsStatistic
            statistic={statistic.chart[period].statistic}
            sharpeRatio={statistic.sharpeRatio}
          />
        </Surface>
        <Surface className="program-details-statistic-section__chart">
          <ChartPeriod onChange={this.handleChangePeriod} />
          <ProgramDetailsChart />
        </Surface>
      </div>
    );
  }
}

export default ProgramDetailsStatisticSection;
