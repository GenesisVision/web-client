import { Row } from "components/row/row";
import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { MarketWatchHeaderCell } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-header-cell";
import { MarketWatchRow } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-row";
import {
  CHANGE_COLUMN,
  filterForSearch,
  SortingType,
  sortMarketWatchItems
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MergedTickerSymbolType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import styles from "./market-watch.module.scss";

interface Props {
  search: string;
  column: string;
  items: MergedTickerSymbolType[];
  filteringFunction: (item: MergedTickerSymbolType) => boolean;
}

const _MarketWatchTable: React.FC<Props> = ({
  items,
  column,
  search,
  filteringFunction
}) => {
  const { getFavorites: getFavoritesFunc } = useContext(TerminalTickerContext);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { exchangeAccountId, setSymbol } = useContext(TerminalInfoContext);

  const [sorting, setSorting] = useState<SortingType>({
    dataType: "string",
    direction: SORTING_DIRECTION.ASC,
    field: "name"
  });

  const getFavorites = useMemo(() => getFavoritesFunc, []);

  return (
    <>
      <Row size={"small"} className={styles["market-watch__header-container"]}>
        <table className={styles["market-watch__table"]}>
          <thead>
            <MarketWatchHeaderCell
              dataType={"string"}
              sorting={sorting}
              setSorting={setSorting}
              field={"name"}
            >
              Symbol
            </MarketWatchHeaderCell>
            <MarketWatchHeaderCell
              dataType={"number"}
              sorting={sorting}
              setSorting={setSorting}
              field={"lastPrice"}
            >
              Last price
            </MarketWatchHeaderCell>
            {column === CHANGE_COLUMN ? (
              <MarketWatchHeaderCell
                dataType={"number"}
                sorting={sorting}
                setSorting={setSorting}
                field={"priceChangePercent"}
              >
                Change
              </MarketWatchHeaderCell>
            ) : (
              <MarketWatchHeaderCell
                dataType={"number"}
                sorting={sorting}
                setSorting={setSorting}
                field={"quoteVolume"}
              >
                Volume
              </MarketWatchHeaderCell>
            )}
          </thead>
        </table>
      </Row>
      <div className={styles["market-watch__items-container"]}>
        <table className={styles["market-watch__table"]}>
          <tbody>
            {items
              .filter(search ? () => true : filteringFunction)
              .filter(filterForSearch(search))
              .sort(sortMarketWatchItems(sorting))
              .map(
                ({
                  isFavorite,
                  eventTime,
                  quoteAsset,
                  baseAsset,
                  quoteVolume,
                  name,
                  lastPrice,
                  priceChange,
                  priceChangePercent
                }) => (
                  <MarketWatchRow
                    getFavorites={getFavorites}
                    isAuthenticated={isAuthenticated}
                    exchangeAccountId={exchangeAccountId}
                    setSymbol={setSymbol}
                    key={name}
                    isFavorite={isFavorite}
                    eventTime={eventTime}
                    quoteAsset={quoteAsset}
                    baseAsset={baseAsset}
                    column={column}
                    volume={quoteVolume}
                    symbol={name}
                    lastPrice={lastPrice}
                    priceChange={priceChange}
                    priceChangePercent={priceChangePercent}
                  />
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const MarketWatchTable = React.memo(_MarketWatchTable);
