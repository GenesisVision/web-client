import { MarketWatch } from "pages/trade/binance-trade-page/trading/market-watch/market-watch";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/terminal-ticker.context";
import React, { useContext } from "react";

const _MarketWatchContainer: React.FC = () => {
  const { items } = useContext(TerminalTickerContext);
  return items?.length ? <MarketWatch items={items} /> : null;
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);
