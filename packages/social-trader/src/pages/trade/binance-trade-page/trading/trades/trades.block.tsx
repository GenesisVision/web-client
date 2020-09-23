import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { TradesContainer } from "pages/trade/binance-trade-page/trading/trades/trades.container";
import React from "react";

import styles from "./trades.module.scss";

interface Props {}

export const TradesBlock: React.FC<Props> = () => {
  return (
    <TerminalDefaultBlock className={styles["trades"]}>
      <TradesContainer />
    </TerminalDefaultBlock>
  );
};
