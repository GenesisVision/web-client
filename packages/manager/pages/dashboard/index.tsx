import DashboardPage from "pages/dashboard/dashboard.page";
import { getInRequests } from "pages/dashboard/services/dashboard-in-requests.service";
import React from "react";
import { compose } from "redux";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

import {
  composeAssetChart,
  getAssets
} from "../../src/pages/dashboard/services/dashboard.service";

const Dashboard: NextPageWithRedux<void> = () => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(getAssets(ctx)),
    ctx.reduxStore.dispatch(getInRequests(ctx)),
    ctx.reduxStore.dispatch(composeAssetChart(ASSETS_TYPES.Program))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Dashboard);
