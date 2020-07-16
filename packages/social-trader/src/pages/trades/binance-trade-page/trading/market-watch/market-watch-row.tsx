import { Text } from "components/text/text";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { CHANGE_COLUMN } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { getTextColor } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import { TerminalCurrency } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./market-watch.module.scss";

interface Props {
  eventTime: number;
  quoteAsset: TerminalCurrency;
  baseAsset: TerminalCurrency;
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
    const { setSymbol } = useContext(TerminalInfoContext);

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
          <Text muted size={"small"}>
            {symbol}
          </Text>
        </td>
        <td className={styles["market-watch__cell"]}>
          <TradeStatefulValue
            value={formatCurrencyValue(+lastPrice, quoteAsset)}
            trigger={eventTime}
          />
        </td>
        <td className={styles["market-watch__table-value"]}>
          {column === CHANGE_COLUMN ? (
            <Text color={getTextColor(+priceChangePercent)}>
              {priceChangePercent} %
            </Text>
          ) : (
            <Text color={getTextColor(+volume)}>{volume} %</Text>
          )}
        </td>
      </tr>
    );
  }
);
