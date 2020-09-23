import withBetaTesting from "decorators/with-beta-testing";
import withReduxStore from "decorators/with-redux-store";
import withToken from "decorators/with-token";
import withTradeLayout from "decorators/with-trade-layout";
import { BrokerTradeServerType } from "gv-api-web";
import { TerminalPage } from "pages/trade/terminal.page";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { getTerminalApiMethods } from "pages/trades/binance-trade-page/services/api.helpers";
import { SymbolState } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContextProvider } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { parseSymbolFromUrlParam } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  TerminalAuthDataType,
  TerminalType
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";
import { initializeStore } from "store";
import { getParamsFromCtxWithSplit } from "utils/ssr-helpers";
import { NextPageWithRedux } from "utils/types";

interface Props {
  exchangeAccountId?: string;
  brokerType?: BrokerTradeServerType;
  authData?: TerminalAuthDataType;
  terminalType?: TerminalType;
  symbol?: SymbolState;
}

const Page: NextPageWithRedux<Props> = ({
  exchangeAccountId,
  brokerType = "Binance",
  authData,
  terminalType,
  symbol
}) => {
  const terminalMethods = getTerminalApiMethods(brokerType, terminalType);
  return (
    <TerminalMethodsContextProvider methods={terminalMethods}>
      <TerminalPage
        exchangeAccountId={exchangeAccountId}
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
  const terminalType = params[TYPE_PARAM_NAME]
    ? params[TYPE_PARAM_NAME].toLowerCase()
    : undefined;
  const symbol = id ? parseSymbolFromUrlParam(String(id)) : undefined;

  let brokerType: BrokerTradeServerType | undefined;
  let authData;

  if (ctx.token.isExist()) {
    const credentialsData = await api
      .dashboard(ctx.token)
      .getExchangeAccountCredentials({ exchangeAccountId });
    brokerType = credentialsData?.broker?.type;
    authData = {
      publicKey: credentialsData?.credentials?.apiKey,
      privateKey: credentialsData?.credentials?.apiSecret
    };
  }

  return {
    exchangeAccountId,
    brokerType,
    authData,
    symbol,
    terminalType
  };
};

export default compose(
  withReduxStore(initializeStore),
  withToken,
  withTradeLayout,
  withBetaTesting("TradingTerminal")
)(Page);
