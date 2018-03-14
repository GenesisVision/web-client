import { connect } from "react-redux";
import React, { PureComponent } from "react";

import dashboardActions from "../../../actions/dashboard-actions";
import DashboardChart from "./dashboard-chart/dashboard-chart";

class DashboardChartContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchDashboardChart();
  }
  render() {
    const { isPending, chart } = this.props;
    if (isPending || chart === undefined) {
      return null;
    }

    const data = chart.chart.map(x => ({ x: x }));
    return <DashboardChart data={data} />;
  }
}
const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.dashboardData.chart;

  let chart;
  if (data) {
    chart = data;
  }
  return { isPending, chart, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchDashboardChart: () => {
    dispatch(dashboardActions.fetchDashboardChart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardChartContainer
);
