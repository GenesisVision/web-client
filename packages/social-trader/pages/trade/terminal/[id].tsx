import withTradeLayout from "decorators/with-trade-layout";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { BinanceTrade } from "pages/trades/binance-trade-page/binance-trade.page";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  authCookieService,
  parseSymbolFromUrlParam
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { api } from "services/api-client/swagger-custom-client";
import { getParamsFromCtxWithSplit } from "utils/ssr-helpers";
import { NextPageWithRedux } from "utils/types";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

const Page: NextPageWithRedux<Props> = ({ authData, type, symbol }) => {
  return <BinanceTrade authData={authData} type={type} symbol={symbol} />;
};

Page.getInitialProps = async ctx => {
  const { get } = authCookieService(ctx);
  let authData;
  let brokerType;
  const { id } = ctx.query;
  const params = getParamsFromCtxWithSplit(ctx);
  const exchangeAccountId = params["id"];
  if (exchangeAccountId) {
    const credentialsData = await api
      .dashboard(ctx.token)
      .getExchangeAccountCredentials({ exchangeAccountId });
    const {
      credentials: { apiKey, apiSecret },
      broker: { type }
    } = credentialsData;
    authData = {
      publicKey: apiKey,
      privateKey: apiSecret
    };
    brokerType = type;
  } else {
    authData = get();
    brokerType = "Binance";
  }
  const symbol = id ? parseSymbolFromUrlParam(String(id)) : undefined;
  const type = params[TYPE_PARAM_NAME]
    ? params[TYPE_PARAM_NAME].toLowerCase()
    : undefined;
  return {
    brokerType,
    authData,
    symbol,
    type
  };
};

export default withTradeLayout(Page);
