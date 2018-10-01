import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as programDetailsService from "../../services/program-details.service";
import ProgramDetailsChartSection from "./program-details-chart-section";
import ProgramDetailsStatistic from "./program-details-statistics/program-details-statistics";

class ProgramDetailsChartContainer extends Component {
  state = {
    selectedPeriod: 0
  };

  componentDidMount() {
    const { service } = this.props;
    service.getProgramChart();
  }

  render() {
    const { chart } = this.props;
    if (!chart) return null;
    const { selectedPeriod } = this.state;
    return (
      <div className="program-detail-chart">
        <ProgramDetailsStatistic statistic={chart[selectedPeriod].statistic} />
        <ProgramDetailsChartSection />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { chartData } = state.programDetails;
  return {
    chart: chartData.data,
    isPending: chartData.isPending
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programDetailsService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsChartContainer);
