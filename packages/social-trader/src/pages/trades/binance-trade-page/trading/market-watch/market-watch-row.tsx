import {
  ColoredText,
  ColoredTextColor
} from "components/colored-text/colored-text";
import { MutedText } from "components/muted-text/muted-text";
import { CHANGE_COLUMN } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import React from "react";

interface Props {
  column: string;
  volume: string;
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
}

const getTextColor = (value: number): ColoredTextColor | undefined => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return;
};

export const MarketWatchRow: React.FC<Props> = React.memo(
  ({ column, volume, symbol, lastPrice, priceChange, priceChangePercent }) => {
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
          {column === CHANGE_COLUMN ? (
            <ColoredText color={getTextColor(+priceChangePercent)}>
              {priceChangePercent} %
            </ColoredText>
          ) : (
            <ColoredText color={getTextColor(+volume)}>{volume} %</ColoredText>
          )}
        </td>
      </tr>
    );
  }
);
