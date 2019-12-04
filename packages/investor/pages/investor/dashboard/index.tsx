import DashboardPage from "pages/dashboard/dashboard.page";
import { getTopPortfolioEvents } from "pages/dashboard/services/dashboard-events.services";
import { getInRequests } from "pages/dashboard/services/dashboard-in-requests.service";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Dashboard: NextPageWithRedux<{}> = () => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(getTopPortfolioEvents(ctx)),
    ctx.reduxStore.dispatch(getInRequests(ctx))
  ]);
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Dashboard);
