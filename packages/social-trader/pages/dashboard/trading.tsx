import { NextPage } from "next";
import OverviewPage from "pages/dashboard/overview.page";
import TradingPage from "pages/dashboard/trading.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <TradingPage />;
};

export default withDefaultLayout(Page);
