import withTradeLayout from "decorators/with-trade-layout";
import { NextPage } from "next";
import { BinanceTrade } from "pages/trades/binance-trade-page/binance-trade.page";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { parseSymbolFromUrlParam } from "pages/trades/binance-trade-page/trading/trading.helpers";
import React from "react";

interface Props {
  symbol?: SymbolState;
}

const Page: NextPage<Props> = ({ symbol }) => {
  return <BinanceTrade symbol={symbol} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return {
    symbol: parseSymbolFromUrlParam(String(id))
  };
};

export default withTradeLayout(Page);
