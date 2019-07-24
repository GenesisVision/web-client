import DashboardPage from "pages/dashboard/dashboard.page";
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
  useEffect(() => {
    service.getTopPortfolioEvents();
    service.getInRequests();
  }, []);
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  if (ctx.req) {
    Promise.all([
      await ctx.reduxStore.dispatch(getTopPortfolioEvents(ctx)),
      await ctx.reduxStore.dispatch(getInRequests(ctx))
    ]);
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getTopPortfolioEvents, getInRequests },
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
}

interface Props extends DispatchProps {}
