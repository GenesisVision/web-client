import { BinanceTradeLogin } from "pages/trades/binance-trade-page/binance-trade-login";
import { getBinanceTerminalApiMethods } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TerminalMethodsContextProvider } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingContainer } from "pages/trades/binance-trade-page/trading/trading.container";
import { useTradeAuth } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

export const BinanceTradeContainer: React.FC<Props> = ({
  authData,
  type,
  symbol
}) => {
  const terminalMethods = getBinanceTerminalApiMethods(type);
  const { set } = useTradeAuth();
  const { privateKey, publicKey } = authData;
  return (
    <>
      {privateKey && publicKey ? (
        <TerminalMethodsContextProvider methods={terminalMethods}>
          <TradingContainer authData={authData} type={type} symbol={symbol} />
        </TerminalMethodsContextProvider>
      ) : (
        <BinanceTradeLogin onSubmit={set} />
      )}
    </>
  );
};
