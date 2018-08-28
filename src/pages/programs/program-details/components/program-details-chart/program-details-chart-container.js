import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as programDetailsService from "../../services/program-details.service";
import ProgramDetailsChart from "./program-details-chart";

class ProgramDetailsChartContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
  }

  render() {
    return <ProgramDetailsChart />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programDetailsService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsChartContainer);
