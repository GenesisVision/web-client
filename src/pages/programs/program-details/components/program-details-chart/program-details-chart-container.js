import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as programDetailsService from "../../services/program-details.service";
import chartMock from "./chart-mock-data";
import ProgramDetailsChart from "./program-details-chart";
import ProgramDetailsStatistic from "./program-details-statistics/program-details-statistics";

const getDefaultState = () => ({
  dateFrom: moment().format(moment.defaultFormatUtc),
  dateTo: moment()
    .add(1, "M")
    .format(moment.defaultFormatUtc),
  maxPointCount: 100
});

class ProgramDetailsChartContainer extends Component {
  componentDidMount() {
    this.fetchProgramChart();
  }

  state = getDefaultState();

  fetchProgramChart = () => {
    const { service } = this.props;

    let { dateFrom, dateTo, maxPointCount } = this.state;
    service.fetchProgramChart({ dateFrom, dateTo, maxPointCount });
  };

  render() {
    const { chart } = this.props;
    if (!chart) return null;
    if (!chart[0]) return null;

    return (
      <Fragment>
        <ProgramDetailsStatistic statistic={chart[0].statistic} />
        <ProgramDetailsChart />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  let { data } = state.programDetails.chart;
  if (!data) return {};
  return {
    // chart: data.chart
    chart: chartMock.chart
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programDetailsService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsChartContainer);
