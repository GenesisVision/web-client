import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { MarketWatchContainer } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.container";
import React from "react";

import "./market-watch.scss";

export const MarketWatchBlock: React.FC = () => {
  return (
    <DefaultBlock solid>
      <Row>
        <h2>Market watch</h2>
      </Row>
      <MarketWatchContainer />
    </DefaultBlock>
  );
};
