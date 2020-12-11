import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { OrderBookContainer } from "pages/trade/binance-trade-page/trading/order-book/order-book.container";
import React from "react";

import styles from "./order-book.module.scss";

export const OrderBookBlock: React.FC = () => {
  return (
    <TerminalDefaultBlock className={styles["order-book"]}>
      <OrderBookContainer />
    </TerminalDefaultBlock>
  );
};
