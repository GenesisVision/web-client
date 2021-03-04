import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import DashboardPage from "pages/dashboard/dashboard.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <DashboardPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: [
    "program-details-page",
    "asset-settings",
    "portfolio-events",
    "asset-details",
    "dashboard-page"
  ]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
