import { connect } from "react-redux";
import React, { PureComponent } from "react";

import dashboardActions from "../../../actions/dashboard-actions";
import DashboardProgramList from "./dashboard-program-list/dashboard-program-list";

class DashboardProgramListContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchDashboardPrograms();
  }
  render() {
    const { isPending, dashboard } = this.props;
    if (isPending || dashboard === undefined) {
      return null;
    }

    return <DashboardProgramList programs={dashboard} />;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.dashboardData.programs;

  let dashboard;
  if (data) {
    dashboard = data.investmentPrograms;
  }
  if (errorMessage !== "") {
    dashboard = [];
  }
  return { isPending, dashboard, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchDashboardPrograms: () => {
    dispatch(dashboardActions.fetchDashboardPrograms());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardProgramListContainer
);
