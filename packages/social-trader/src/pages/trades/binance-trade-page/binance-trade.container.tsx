import { BinanceTradeLogin } from "pages/trades/binance-trade-page/binance-trade-login";
import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TradingContainer } from "pages/trades/binance-trade-page/trading/trading.container";
import React from "react";

export const BinanceTradeContainer: React.FC = () => {
  const { authData, set } = useTradeAuth();
  const { privateKey, publicKey } = authData;
  return (
    <div>
      {privateKey && publicKey ? (
        <TradingContainer authData={authData} />
      ) : (
        <BinanceTradeLogin onSubmit={set} />
      )}
    </div>
  );
};
