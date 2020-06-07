import { ChartContainer } from "pages/trades/binance-trade-page/trading/chart/chart.container";
import { TerminalDefaultBlock } from "pages/trades/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import React from "react";

import styles from "./chart.module.scss";

export const ChartBlock: React.FC = () => {
  return (
    <TerminalDefaultBlock className={styles.chart}>
      <ChartContainer />
    </TerminalDefaultBlock>
  );
};
