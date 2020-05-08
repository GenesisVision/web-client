import { BinanceTradeLogin } from "pages/trades/binance-trade-page/binance-trade-login";
import { BinanceTerminalMethods } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TerminalMethodsContextProvider } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingContainerWithInfo } from "pages/trades/binance-trade-page/trading/trading.container";
import { useTradeAuth } from "pages/trades/binance-trade-page/trading/trading.helpers";
import React from "react";

interface Props {
  symbol?: SymbolState;
}

export const BinanceTradeContainer: React.FC<Props> = ({ symbol }) => {
  const { authData, set } = useTradeAuth();
  const { privateKey, publicKey } = authData;
  return (
    <>
      {privateKey && publicKey ? (
        <TerminalMethodsContextProvider methods={BinanceTerminalMethods}>
          <TradingContainerWithInfo symbol={symbol} authData={authData} />
        </TerminalMethodsContextProvider>
      ) : (
        <BinanceTradeLogin onSubmit={set} />
      )}
    </>
  );
};
