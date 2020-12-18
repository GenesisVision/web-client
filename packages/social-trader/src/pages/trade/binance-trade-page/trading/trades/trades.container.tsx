import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { Trades } from "pages/trade/binance-trade-page/trading/trades/trades";
import React, { useContext } from "react";

const _TradesContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  return <Trades items={trades} />;
};

export const TradesContainer = React.memo(_TradesContainer);
