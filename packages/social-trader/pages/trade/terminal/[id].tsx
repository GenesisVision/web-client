import withReduxStore from "decorators/with-redux-store";
import withToken from "decorators/with-token";
import withTradeLayout from "decorators/with-trade-layout";
import { BrokerTradeServerType } from "gv-api-web";
import { TYPE_PARAM_NAME } from "pages/trade/binance-trade-page/binance-trade.helpers";
import { getTerminalApiMethods } from "pages/trade/binance-trade-page/services/api.helpers";
import { SymbolState } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContextProvider } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { parseSymbolFromUrlParam } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  TerminalAuthDataType,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { TerminalPage } from "pages/trade/terminal.page";
import React from "react";
import { compose } from "redux";
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

  return {
    namespacesRequired: ["auth"],
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
  withTradeLayout
)(Page);
