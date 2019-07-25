import DashboardPage from "pages/dashboard/dashboard.page";
import { getPortfolioChart } from "pages/dashboard/services/dashboard-chart.service";
import { getTopPortfolioEvents } from "pages/dashboard/services/dashboard-events.services";
import { getInRequests } from "pages/dashboard/services/dashboard-in-requests.service";
import React, { useEffect } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Dashboard: NextPageWithRedux<Props, {}> = ({ service }) => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(getTopPortfolioEvents(ctx)),
    ctx.reduxStore.dispatch(getInRequests(ctx)),
    ctx.reduxStore.dispatch(getPortfolioChart(ctx))
  ]);
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getTopPortfolioEvents, getInRequests, getPortfolioChart },
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
  getTopPortfolioEvents: typeof getTopPortfolioEvents;
  getInRequests: typeof getInRequests;
  getPortfolioChart: typeof getPortfolioChart;
}

interface Props extends DispatchProps {}
