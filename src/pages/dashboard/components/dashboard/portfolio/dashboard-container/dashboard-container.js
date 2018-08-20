import ProgramDepositContainer from "modules/program-deposit/components/program-deposit-container/program-deposit-container";
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import popupActions from "../../../../../popup/actions/popup-actions";
import dashboardActions from "../../../../actions/dashboard-actions";
import DashboardProgramList from "./dashboard-program-list/dashboard-program-list";
import DashboardStatistic from "./dashboard-statistic/dashboard-statistic";

class DashboardContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchDashboardPrograms();
  }
  render() {
    const { isPending, dashboard, openInvestPopup } = this.props;
    if (isPending || dashboard === undefined) {
      return null;
    }

    return (
      <div>
        <DashboardStatistic
          profitFromPrograms={dashboard.profitFromPrograms}
          investedAmount={dashboard.investedAmount}
          hasPrograms={dashboard.investmentPrograms.length > 0}
          totalPortfolioAmount={dashboard.totalPortfolioAmount}
        />
        <DashboardProgramList
          programs={dashboard.investmentPrograms}
          openInvestPopup={openInvestPopup}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.dashboardData.programs;

  let dashboard;
  if (data) {
    dashboard = data;
  }
  if (errorMessage !== "") {
    dashboard = [];
  }
  return { isPending, dashboard, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchDashboardPrograms: () => {
    dispatch(dashboardActions.fetchDashboardPrograms());
  },
  openInvestPopup: programId => () => {
    dispatch(
      popupActions.openPopup({
        component: ProgramDepositContainer,
        popupProps: { programId }
      })
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
