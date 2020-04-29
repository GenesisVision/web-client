import { ColoredText } from "components/colored-text/colored-text";
import { MutedText } from "components/muted-text/muted-text";
import { CHANGE_COLUMN } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getTextColor } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { formatCurrencyValue } from "utils/formatter";

interface Props {
  quoteAsset: TradeCurrency;
  baseAsset: TradeCurrency;
  column: string;
  volume: string;
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
}

export const MarketWatchRow: React.FC<Props> = React.memo(
  ({
    quoteAsset,
    baseAsset,
    column,
    volume,
    symbol,
    lastPrice,
    priceChange,
    priceChangePercent
  }) => {
    const [firstLastPrice, setPrevLastPrice] = useState(lastPrice);
    useEffect(() => {
      if (!firstLastPrice) setPrevLastPrice(lastPrice);
    }, [lastPrice]);

    const { setSymbol } = useContext(TradingInfoContext);

    const handleClick = useCallback(() => {
      setSymbol({ quoteAsset, baseAsset });
    }, [quoteAsset, baseAsset]);

    return (
      <tr key={symbol} onClick={handleClick}>
        <td className="market-watch__name">
          <MutedText small>{symbol}</MutedText>
        </td>
        <td className="market-watch__name">
          <ColoredText color={getTextColor(+firstLastPrice - +lastPrice)}>
            {formatCurrencyValue(+lastPrice, quoteAsset)}
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
