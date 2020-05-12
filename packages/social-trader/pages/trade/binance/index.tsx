import withTradeLayout from "decorators/with-trade-layout";
import { NextPage } from "next";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { BinanceTrade } from "pages/trades/binance-trade-page/binance-trade.page";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TerminalType } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { getParamsFromCtxWithSplit } from "utils/ssr-helpers";

interface Props {
  type?: TerminalType;
  symbol?: SymbolState;
}

const Page: NextPage<Props> = ({ type }) => {
  return <BinanceTrade type={type} />;
};

Page.getInitialProps = async ctx => {
  const params = getParamsFromCtxWithSplit(ctx);
  return {
    type: (params[TYPE_PARAM_NAME] || "").toLowerCase(),
    namespacesRequired: ["mt5-page"]
  };
};

export default withTradeLayout(Page);
