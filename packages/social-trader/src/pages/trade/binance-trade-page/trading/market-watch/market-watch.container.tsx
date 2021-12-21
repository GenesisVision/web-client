import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { MarketWatch } from "pages/trade/binance-trade-page/trading/market-watch/market-watch";
import React, { useContext } from "react";

import { TerminalInfoContext } from "../contexts/terminal-info.context";

const _MarketWatchContainer: React.FC = () => {
  const { items } = useContext(TerminalTickerContext);
  const { terminalType } = useContext(TerminalInfoContext);

  const isFutures = terminalType === "futures";

  if (!items?.length) {
    return null;
  }

  return isFutures ? (
    // todo fix types
    <MarketWatch
      items={items.filter(
        // @ts-ignore
        ({ quoteAsset, contractType }) =>
          quoteAsset === "USDT" && contractType === "Perpetual"
      )}
    />
  ) : (
    <MarketWatch
      items={items.filter(({ permissions }) => {
        return permissions.includes("Spot");
      })}
    />
  );
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);
