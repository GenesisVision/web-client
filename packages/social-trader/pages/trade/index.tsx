import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { TradePage } from "pages/trade/trade.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <TradePage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});

export default compose(withDefaultLayout)(Page);
