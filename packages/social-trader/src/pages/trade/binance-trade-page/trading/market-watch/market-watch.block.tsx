import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { MarketWatchContainer } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.container";
import React from "react";

import styles from "./market-watch.module.scss";

export const MarketWatchBlock: React.FC = () => {
  return (
    <TerminalDefaultBlock className={styles["market-watch"]}>
      <MarketWatchContainer />
    </TerminalDefaultBlock>
  );
};
