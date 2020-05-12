import withTradeLayout from "decorators/with-trade-layout";
import { NextPage } from "next";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { BinanceTrade } from "pages/trades/binance-trade-page/binance-trade.page";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { authCookieService } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { getParamsFromCtxWithSplit } from "utils/ssr-helpers";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

const Page: NextPage<Props> = ({ authData, type }) => {
  return <BinanceTrade authData={authData} type={type} />;
};

Page.getInitialProps = async ctx => {
  const { get } = authCookieService(ctx);
  const authData = get();
  const params = getParamsFromCtxWithSplit(ctx);
  return {
    authData,
    type: (params[TYPE_PARAM_NAME] || "").toLowerCase(),
    namespacesRequired: ["mt5-page"]
  };
};

export default withTradeLayout(Page);
