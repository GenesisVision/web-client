import { BinanceTradeLogin } from "pages/trades/binance-trade-page/binance-trade-login";
import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import {
  SymbolState,
  TradingInfoContextProvider
} from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingContainer } from "pages/trades/binance-trade-page/trading/trading.container";
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
        <TradingInfoContextProvider>
          <TradingContainer symbol={symbol} authData={authData} />
        </TradingInfoContextProvider>
      ) : (
        <BinanceTradeLogin onSubmit={set} />
      )}
    </>
  );
};
