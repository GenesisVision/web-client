import { BinanceTradeLogin } from "pages/trades/binance-trade-page/binance-trade-login";
import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingContainerWithInfo } from "pages/trades/binance-trade-page/trading/trading.container";
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
        <TradingContainerWithInfo symbol={symbol} authData={authData} />
      ) : (
        <BinanceTradeLogin onSubmit={set} />
      )}
    </>
  );
};
