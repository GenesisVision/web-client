import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import { OrderBookContainer } from "pages/trades/binance-trade-page/trading/order-book/order-book.container";
import React from "react";

import styles from "./order-book.module.scss";

export const OrderBookBlock: React.FC = () => {
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      roundedBorder={false}
      bordered
      className={styles["order-book"]}
    >
      <OrderBookContainer />
    </DefaultBlock>
  );
};
