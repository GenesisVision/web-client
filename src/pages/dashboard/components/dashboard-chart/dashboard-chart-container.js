import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getChartCommon } from "../../services/dashboard.service";
import DashboardChart from "./dashboard-chart";

class DashboardChartContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getChartCommon();
  }

  render() {
    return <DashboardChart />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.programsData.items;
  return { isPending, data };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getChartCommon }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardChartContainer);
