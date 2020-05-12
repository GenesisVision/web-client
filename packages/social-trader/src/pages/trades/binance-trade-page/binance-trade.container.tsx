import { BinanceTradeLogin } from "pages/trades/binance-trade-page/binance-trade-login";
import { getBinanceTerminalApiMethods } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TerminalMethodsContextProvider } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingContainerWithInfo } from "pages/trades/binance-trade-page/trading/trading.container";
import { useTradeAuth } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { TerminalType } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

interface Props {
  type?: TerminalType;
  symbol?: SymbolState;
}

export const BinanceTradeContainer: React.FC<Props> = ({ type, symbol }) => {
  const terminalMethods = getBinanceTerminalApiMethods(type);
  const { authData, set } = useTradeAuth();
  const { privateKey, publicKey } = authData;
  return (
    <>
      {privateKey && publicKey ? (
        <TerminalMethodsContextProvider methods={terminalMethods}>
          <TradingContainerWithInfo
            type={type}
            symbol={symbol}
            authData={authData}
          />
        </TerminalMethodsContextProvider>
      ) : (
        <BinanceTradeLogin onSubmit={set} />
      )}
    </>
  );
};
