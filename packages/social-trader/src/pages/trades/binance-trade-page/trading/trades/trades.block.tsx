import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import { TradesContainer } from "pages/trades/binance-trade-page/trading/trades/trades.container";
import React from "react";

import styles from "./trades.module.scss";

interface Props {}

export const TradesBlock: React.FC<Props> = () => {
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      roundedBorder={false}
      bordered
      className={styles["trades"]}
    >
      <TradesContainer />
    </DefaultBlock>
  );
};
