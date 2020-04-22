import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { MarketWatchContainer } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.container";
import React from "react";

interface Props {
  authData: TradeAuthDataType;
}

const _TradingContainer: React.FC<Props> = ({ authData }) => {
  return (
    <div>
      <MarketWatchContainer />
    </div>
  );
};

export const TradingContainer = React.memo(_TradingContainer);
