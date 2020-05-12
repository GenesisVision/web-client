import withTradeLayout from "decorators/with-trade-layout";
import { NextPage } from "next";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { BinanceTrade } from "pages/trades/binance-trade-page/binance-trade.page";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { parseSymbolFromUrlParam } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { TerminalType } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { getParamsFromCtxWithSplit } from "utils/ssr-helpers";

interface Props {
  type?: TerminalType;
  symbol?: SymbolState;
}

const Page: NextPage<Props> = ({ type, symbol }) => {
  return <BinanceTrade type={type} symbol={symbol} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const params = getParamsFromCtxWithSplit(ctx);
  return {
    type: (params[TYPE_PARAM_NAME] || "").toLowerCase(),
    symbol: parseSymbolFromUrlParam(String(id))
  };
};

export default withTradeLayout(Page);
