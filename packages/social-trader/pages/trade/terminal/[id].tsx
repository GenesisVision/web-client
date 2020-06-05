import withTradeLayout from "decorators/with-trade-layout";
import { BrokerTradeServerType } from "gv-api-web";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { getTerminalApiMethods } from "pages/trades/binance-trade-page/services/api.helpers";
import { TerminalMethodsContextProvider } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TerminalContainer } from "pages/trades/binance-trade-page/trading/terminal.container";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/terminal.types";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { parseSymbolFromUrlParam } from "pages/trades/binance-trade-page/trading/trading.helpers";
import React from "react";
import { api } from "services/api-client/swagger-custom-client";
import { getParamsFromCtxWithSplit } from "utils/ssr-helpers";
import { NextPageWithRedux } from "utils/types";

interface Props {
  brokerType?: BrokerTradeServerType;
  authData: TradeAuthDataType;
  terminalType?: TerminalType;
  symbol?: SymbolState;
}

const Page: NextPageWithRedux<Props> = ({
  brokerType,
  authData,
  terminalType,
  symbol
}) => {
  const terminalMethods = getTerminalApiMethods(brokerType, terminalType);
  return (
    <TerminalMethodsContextProvider methods={terminalMethods}>
      <TerminalContainer
        authData={authData}
        type={terminalType}
        symbol={symbol}
      />
    </TerminalMethodsContextProvider>
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const params = getParamsFromCtxWithSplit(ctx);
  const exchangeAccountId = params["id"];
  const credentialsData = await api
    .dashboard(ctx.token)
    .getExchangeAccountCredentials({ exchangeAccountId });
  const {
    credentials: { apiKey, apiSecret },
    broker: { type }
  } = credentialsData;
  const symbol = id ? parseSymbolFromUrlParam(String(id)) : undefined;
  const terminalType = params[TYPE_PARAM_NAME]
    ? params[TYPE_PARAM_NAME].toLowerCase()
    : undefined;
  return {
    brokerType: type as BrokerTradeServerType,
    authData: {
      publicKey: apiKey,
      privateKey: apiSecret
    },
    symbol,
    terminalType
  };
};

export default withTradeLayout(Page);
