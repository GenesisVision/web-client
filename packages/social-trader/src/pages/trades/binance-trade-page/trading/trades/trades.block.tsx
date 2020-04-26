import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { TradesContainer } from "pages/trades/binance-trade-page/trading/trades/trades.container";
import React from "react";

import styles from "./trades.module.scss";

interface Props {}

export const TradesBlock: React.FC<Props> = () => {
  return (
    <DefaultBlock solid className={styles["trades"]}>
      <Row>
        <h2>Trades</h2>
      </Row>
      <Row>
        <TradesContainer />
      </Row>
    </DefaultBlock>
  );
};
