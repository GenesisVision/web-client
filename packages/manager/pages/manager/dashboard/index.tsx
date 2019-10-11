import DashboardPage from "pages/dashboard/dashboard.page";
import { getAssets } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Dashboard: NextPageWithRedux<void> = () => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  await ctx.reduxStore.dispatch(getAssets(ctx));
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Dashboard);
