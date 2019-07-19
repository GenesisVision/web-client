import { NextPage } from "next";
import DashboardPage from "pages/dashboard/dashboard.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Dashboard: NextPage<any> = () => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async () => {
  return {};
};

export default withDefaultLayout(withPrivateRoute(Dashboard));
