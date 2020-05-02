import { ColoredText } from "components/colored-text/colored-text";
import { MutedText } from "components/muted-text/muted-text";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { CHANGE_COLUMN } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getTextColor } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext } from "react";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./market-watch.module.scss";

interface Props {
  eventTime: number;
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
    eventTime,
    quoteAsset,
    baseAsset,
    column,
    volume,
    symbol,
    lastPrice,
    priceChange,
    priceChangePercent
  }) => {
    const { setSymbol } = useContext(TradingInfoContext);

    const handleClick = useCallback(() => {
      setSymbol({ quoteAsset, baseAsset });
    }, [quoteAsset, baseAsset]);

    return (
      <tr
        className={styles["market-watch__row"]}
        key={symbol}
        onClick={handleClick}
      >
        <td className={styles["market-watch__cell"]}>
          <MutedText small>{symbol}</MutedText>
        </td>
        <td className={styles["market-watch__cell"]}>
          <TradeStatefulValue
            value={formatCurrencyValue(+lastPrice, quoteAsset)}
            trigger={eventTime}
          />
        </td>
        <td className={styles["market-watch__table-value"]}>
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
