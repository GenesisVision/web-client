import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import TradingPage from "pages/dashboard/trading.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <TradingPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["dashboard-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
