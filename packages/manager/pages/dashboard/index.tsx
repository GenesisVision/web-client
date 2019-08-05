import DashboardPage from "pages/dashboard/dashboard.page";
import { getInRequests } from "pages/dashboard/services/dashboard-in-requests.service";
import React, { useEffect } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

import {
  composeAssetChart,
  getAssets
} from "../../src/pages/dashboard/services/dashboard.service";

const Dashboard: NextPageWithRedux<Props, {}> = ({ service }) => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(getAssets(ctx)),
    ctx.reduxStore.dispatch(getInRequests(ASSETS_TYPES.Program, ctx))
  ]).then(() =>
    ctx.reduxStore.dispatch(composeAssetChart(ASSETS_TYPES.Program))
  );
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { composeAssetChart, getInRequests, getAssets },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withDefaultLayout,
  withPrivateRoute
)(Dashboard);
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  composeAssetChart: typeof composeAssetChart;
  getInRequests: typeof getInRequests;
  getAssets: typeof getAssets;
}

interface Props extends DispatchProps {}
