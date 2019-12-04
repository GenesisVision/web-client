import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import DashboardPage from "pages/dashboard/dashboard.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <DashboardPage />;
};

Page.getInitialProps = async ctx => {};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
