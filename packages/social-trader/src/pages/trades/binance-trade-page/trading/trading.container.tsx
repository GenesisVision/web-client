import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import React from "react";

interface Props {
  authData: TradeAuthDataType;
}

const _TradingContainer: React.FC<Props> = ({ authData }) => {
  return (
    <div>
      <MarketWatchBlock />
    </div>
  );
};

export const TradingContainer = React.memo(_TradingContainer);
