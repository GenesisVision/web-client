import {
  ColoredText,
  ColoredTextColor
} from "components/colored-text/colored-text";
import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { sortMarketWatchItems } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { Ticker } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useState } from "react";

import "./market-watch.scss";

interface Props {
  items: Ticker[];
}

const getTextColor = (value: number): ColoredTextColor | undefined => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return;
};

const MarketWatchRow: React.FC<{
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
}> = React.memo(({ symbol, lastPrice, priceChange, priceChangePercent }) => {
  return (
    <tr key={symbol}>
      <td className="market-watch__name">
        <MutedText>{symbol}</MutedText>
      </td>
      <td className="market-watch__name">
        <ColoredText color={getTextColor(+priceChange)}>
          {lastPrice}
        </ColoredText>
      </td>
      <td className="market-watch__name">
        <ColoredText color={getTextColor(+priceChangePercent)}>
          {priceChangePercent} %
        </ColoredText>
      </td>
    </tr>
  );
});

const _MarketWatch: React.FC<Props> = ({ items }) => {
  const [sortingField, setSortingField] = useState<keyof Ticker | undefined>(
    "symbol"
  );
  const [sortingDirection, setSortingDirection] = useState<
    SORTING_DIRECTION | undefined
  >(SORTING_DIRECTION.ASC);
  return (
    <DefaultBlock solid>
      <Row>
        <h2>Market watch</h2>
      </Row>
      <Row onlyOffset className="market-watch__items-container">
        <table>
          {items
            .sort(sortMarketWatchItems(sortingField, sortingDirection))
            .map(({ symbol, lastPrice, priceChange, priceChangePercent }) => (
              <MarketWatchRow
                symbol={symbol}
                lastPrice={lastPrice}
                priceChange={priceChange}
                priceChangePercent={priceChangePercent}
              />
            ))}
        </table>
      </Row>
    </DefaultBlock>
  );
};

export const MarketWatch = React.memo(_MarketWatch);
