import { connect } from "react-redux";
import React from "react";

import dashboardActions from "../../actions/dashboard-actions";
import DInvestamentsChart from "./d-investments-chart/d-investments-chart";
import DInvestmentProgramList from "./d-investment-program-list/d-investment-program-list";

const DashboardContainer = ({
  location,
  isPending,
  dashboard,
  fetchDashboard
}) => {
  if (isPending) {
    return null;
  }
  if (dashboard === undefined) {
    fetchDashboard();
    return null;
  }
  const chartData = dashboard.map(x => ({
    name: x.title,
    value: x.profitTotal
  }));
  return (
    <div>
      <h1>Dashboard</h1>
      <DInvestamentsChart data={chartData} />
      <DInvestmentProgramList programs={dashboard} location={location} />
    </div>
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.dashboardData;

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
  fetchDashboard: () => {
    dispatch(dashboardActions.fetchDashboard());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
