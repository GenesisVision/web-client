import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import { MarketWatchContainer } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.container";
import React from "react";

import styles from "./market-watch.module.scss";

export const MarketWatchBlock: React.FC = () => {
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      roundedBorder={false}
      bordered
      className={styles["market-watch"]}
    >
      <MarketWatchContainer />
    </DefaultBlock>
  );
};
