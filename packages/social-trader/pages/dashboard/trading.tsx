import { NextPage } from "next";
import TradingPage from "pages/dashboard/trading.page";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Page: NextPage = () => {
  return <TradingPage />;
};

export default compose(
  withPrivateRoute,
  withDefaultLayout
)(Page);
