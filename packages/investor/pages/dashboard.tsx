import DashboardPage from "pages/dashboard/dashboard.page";
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

import { getTopPortfolioEvents } from "../src/pages/dashboard/services/dashboard-events.services";

const Dashboard: NextPageWithRedux<Props, {}> = ({ service }) => {
  useEffect(() => {
    service.getTopPortfolioEvents();
  }, []);
  return <DashboardPage />;
};

Dashboard.getInitialProps = async ctx => {
  if (ctx.req) {
    await ctx.reduxStore.dispatch(getTopPortfolioEvents(ctx));
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getTopPortfolioEvents },
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
}

interface Props extends DispatchProps {}
