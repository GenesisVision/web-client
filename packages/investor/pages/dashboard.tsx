import { NextPage } from "next";
import DashboardPage from "pages/dashboard/dashboard.page";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

import { getTopPortfolioEvents } from "../src/pages/dashboard/services/dashboard-events.services";

const Dashboard: NextPage<Props> = ({ getTopPortfolioEvents }) => {
  useEffect(() => {
    getTopPortfolioEvents();
  }, []);
  return <DashboardPage />;
};

Dashboard.getInitialProps = async (ctx: any) => {
  if (ctx.req) {
    ctx.reduxStore.dispatch(getTopPortfolioEvents(ctx));
  }
  return { getTopPortfolioEvents };
};

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//   service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
//     { getTopPortfolioEvents },
//     dispatch
//   )
// });

export default compose(
  connect(
    null,
    { getTopPortfolioEvents }
  ),
  withDefaultLayout,
  withPrivateRoute
)(Dashboard);

interface Props {
  getTopPortfolioEvents: any;
}
