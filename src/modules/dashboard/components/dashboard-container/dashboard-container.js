import { connect } from "react-redux";
import React from "react";

import dashboardActions from "../../actions/dashboard-actions";
import DInvestamentsChart from "./d-investments-chart/d-investments-chart";
import DInvestmentProgramList from "./d-investment-program-list/d-investment-program-list";
import TraderDepositModal from "../../../../components/trader-deposit-modal/trader-deposit-modal";

const DashboardContainer = ({
  isPending,
  dashboard,
  isDepositOpen,
  fetchDashboard,
  openDepositModal
}) => {
  if (isPending) {
    return null;
  }
  if (dashboard === undefined) {
    fetchDashboard();
    return null;
  }
  const chartData = dashboard.map(x => ({
    name: x.name,
    value: x.totalProfit
  }));
  return (
    <div>
      <h1>Dashboard</h1>
      <DInvestamentsChart data={chartData} />
      <DInvestmentProgramList
        programs={dashboard}
        openDepositModal={openDepositModal}
      />
      <TraderDepositModal isOpen={isDepositOpen} />
    </div>
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.dashboardData.data;
  const { isDepositOpen } = state.dashboardData.layout;

  let dashboard;
  if (data) {
    dashboard = data;
  }
  if (errorMessage !== "") {
    dashboard = {};
  }
  return { isPending, dashboard, isDepositOpen, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchDashboard: () => {
    dispatch(dashboardActions.fetchDashboard());
  },
  openDepositModal: () => {
    dispatch(dashboardActions.openDashboardDepositModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
