import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { MarketWatchContainer } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.container";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import React, { useContext } from "react";

import styles from "./market-watch.module.scss";

interface Props {}

export const MarketWatchBlock: React.FC<Props> = () => {
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  return (
    <DefaultBlock solid className={styles["market-watch"]}>
      <Row>
        <RowItem>
          <h2>Market watch</h2>
        </RowItem>
        <RowItem>
          <MutedText>{getSymbol(baseAsset, quoteAsset)}</MutedText>
        </RowItem>
      </Row>
      <MarketWatchContainer />
    </DefaultBlock>
  );
};
