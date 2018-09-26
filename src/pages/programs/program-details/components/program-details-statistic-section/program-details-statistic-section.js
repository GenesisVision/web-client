import "./program-details-statistic-section.scss";

import ChartPeriod from "components/chart/chart-period/chart-period";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Surface from "../../../../../components/surface/surface";
import { getProgramChart } from "../../services/program-details.service";
import ProgramDetailsChart from "./program-details-chart/program-details-chart";
import ProgramDetailsStatistic from "./program-details-statistics/program-details-statistics";

class ProgramDetailsStatisticSection extends PureComponent {
  state = {
    period: 0
  };

  componentDidUpdate() {
    const { statistic } = this.props;
    if (statistic && statistic.chart) {
      this.setState({ period: statistic.chart.length - 1 });
    }
  }

  render() {
    const { period } = this.state;
    const { isPending, statistic } = this.props;

    if (!statistic || isPending) return null;

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

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getProgramChart }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ProgramDetailsStatisticSection);
