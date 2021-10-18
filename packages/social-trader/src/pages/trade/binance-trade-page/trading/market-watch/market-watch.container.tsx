import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { MarketWatch } from "pages/trade/binance-trade-page/trading/market-watch/market-watch";
import React, { useContext } from "react";

import { TerminalInfoContext } from "../contexts/terminal-info.context";
import { MergedTickerFuturesSymbolType } from "../terminal.types";

const _MarketWatchContainer: React.FC = () => {
  const { items } = useContext(TerminalTickerContext);
  const { terminalType } = useContext(TerminalInfoContext);

  const isFutures = terminalType === "futures";

  if (!items?.length) {
    return null;
  }

  return isFutures ? (
    // fix types
    <MarketWatch
      items={items.filter(
        ({ quoteAsset, contractType }) =>
          quoteAsset === "USDT" && contractType === "Perpetual"
      )}
    />
  ) : (
    <MarketWatch
      items={items.filter(({ permissions }) => {
        // fix it. App crashes when you change terminalType from futures to spot, bc futures doesn't have permissions
        if (!permissions) {
          return false;
        }
        return permissions.includes("Spot");
      })}
    />
  );
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);
