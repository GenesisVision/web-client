import { Row } from "components/row/row";
import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import {
  CHANGE_COLUMN,
  filterForSearch,
  SortingType,
  sortMarketWatchItems
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MarketWatchHeaderCell } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-header-cell";
import { MarketWatchRow } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-row";
import { MergedTickerSymbolType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
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
  const { exchangeAccountId, setSymbol, terminalType } = useContext(
    TerminalInfoContext
  );

  const [sorting, setSorting] = useState<SortingType>({
    dataType: "string",
    direction: SORTING_DIRECTION.ASC,
    field: "name"
  });

  const getFavorites = useMemo(() => getFavoritesFunc, []);

  const visibleItems = items
    .filter(search ? () => true : filteringFunction)
    .filter(filterForSearch(search))
    .sort(sortMarketWatchItems(sorting));

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
                sortIcon={"left"}
                dataType={"number"}
                sorting={sorting}
                setSorting={setSorting}
                field={"priceChangePercent"}
              >
                {terminalType === "futures" ? "24h %" : "Change"}
              </MarketWatchHeaderCell>
            ) : (
              <MarketWatchHeaderCell
                sortIcon={"left"}
                dataType={"number"}
                sorting={sorting}
                setSorting={setSorting}
                field={"quoteVolume"}
              >
                {terminalType === "futures" ? "Volume" : "24h Volume"}
              </MarketWatchHeaderCell>
            )}
          </thead>
        </table>
      </Row>
      <div className={styles["market-watch__items-container"]}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemData={visibleItems}
              itemCount={visibleItems.length}
              itemSize={19}
            >
              {({ style, data, index }) => (
                <div style={style}>
                  <MarketWatchRow
                    getFavorites={getFavorites}
                    isAuthenticated={isAuthenticated}
                    exchangeAccountId={exchangeAccountId}
                    setSymbol={setSymbol}
                    column={column}
                    isFavorite={data[index].isFavorite}
                    eventTime={data[index].eventTime}
                    quoteAsset={data[index].quoteAsset}
                    baseAsset={data[index].baseAsset}
                    volume={data[index].quoteVolume}
                    symbol={data[index].name}
                    lastPrice={data[index].lastPrice}
                    priceChange={data[index].priceChange}
                    priceChangePercent={data[index].priceChangePercent}
                  />
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </>
  );
};

export const MarketWatchTable = React.memo(_MarketWatchTable);
