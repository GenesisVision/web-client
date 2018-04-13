import { connect } from "react-redux";
import React, { PureComponent } from "react";

import dashboardActions from "../../../actions/dashboard-actions";
import DashboardProgramList from "./dashboard-program-list/dashboard-program-list";
import DashboardStatistic from "./dashboard-statistic/dashboard-statistic";
import popupActions from "../../../../popup/actions/popup-actions";

import { PROGRAM_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";

class DashboardContainer extends PureComponent {
  componentWillMount() {
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
    dispatch(popupActions.openPopup(PROGRAM_DEPOSIT_POPUP, { programId }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
