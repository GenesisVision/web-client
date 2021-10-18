import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { TradeStatefulValue } from "pages/trade/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { CHANGE_COLUMN } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MarketWatchFavoriteButton } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-favorite-button";
import { getTextColor } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  SymbolState,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./market-watch.module.scss";

interface Props {
  getFavorites: VoidFunction;
  isAuthenticated?: boolean;
  exchangeAccountId?: string;
  setSymbol: (symbol: SymbolState) => void;
  isFavorite?: boolean;
  eventTime?: number;
  quoteAsset: TerminalCurrency;
  baseAsset: TerminalCurrency;
  column: string;
  volume: number;
  symbol: string;
  lastPrice: number;
  priceChange: number;
  priceChangePercent: number;
}

export const MarketWatchRow: React.FC<Props> = React.memo(
  ({
    getFavorites,
    isAuthenticated,
    exchangeAccountId,
    setSymbol,
    isFavorite,
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
    const handleClick = useCallback(() => {
      setSymbol({ quoteAsset, baseAsset });
    }, [quoteAsset, baseAsset]);

    return (
      <tr className={styles["market-watch__row"]} onClick={handleClick}>
        <td className={styles["market-watch__cell"]}>
          <Center>
            {isAuthenticated && exchangeAccountId && (
              <RowItem size={"xsmall"}>
                <MarketWatchFavoriteButton
                  getFavorites={getFavorites}
                  isFavorite={!!isFavorite}
                  id={exchangeAccountId}
                  symbol={symbol}
                />
              </RowItem>
            )}
            <RowItem>
              <Text muted size={"small"}>
                {symbol}
              </Text>
            </RowItem>
          </Center>
        </td>
        <td className={styles["market-watch__cell"]}>
          <TradeStatefulValue
            thousandSeparator={","}
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
            <Text color={getTextColor(+volume)}>
              <NumberFormat
                displayType="text"
                thousandSeparator={","}
                value={Math.round(volume)}
              />
            </Text>
          )}
        </td>
      </tr>
    );
  }
);
