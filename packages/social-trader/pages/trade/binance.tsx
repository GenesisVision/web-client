import withTradeLayout from "decorators/with-trade-layout";
import { NextPage } from "next";
import { BinanceTrade } from "pages/trades/binance-trade-page/binance-trade.page";
import React from "react";

const Page: NextPage = () => {
  return <BinanceTrade />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["mt5-page"]
});

export default withTradeLayout(Page);
