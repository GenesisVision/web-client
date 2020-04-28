import { DefaultBlock } from "components/default.block/default.block";
import { TradesContainer } from "pages/trades/binance-trade-page/trading/trades/trades.container";
import React from "react";

import styles from "./trades.module.scss";

interface Props {}

export const TradesBlock: React.FC<Props> = () => {
  return (
    <DefaultBlock roundedBorder={false} bordered className={styles["trades"]}>
      <div className={styles["trades__items-container"]}>
        <TradesContainer />
      </div>
    </DefaultBlock>
  );
};
