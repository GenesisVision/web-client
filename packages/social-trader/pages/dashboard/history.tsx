import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import PortfolioEventsAllComponent from "pages/dashboard/components/dashboard-portfolio-events-all/dashboard-portfolio-events-all";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <PortfolioEventsAllComponent />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["asset-details", "dashboard-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
