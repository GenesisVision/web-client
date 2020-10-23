import { Button } from "components/button/button";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import GlobalSearchInput from "components/global-search/components/global-search-result/global-search-input/global-search-input";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Select, { ISelectChangeEvent } from "components/select/select";
import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { MarketWatchHeaderCell } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-header-cell";
import { MarketWatchRow } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-row";
import {
  CHANGE_COLUMN,
  COLUMN_VALUES,
  filterForSearch,
  FILTERING_CURRENCIES,
  FilteringType,
  FilteringVariant,
  getFilteringFunction,
  SortingType,
  sortMarketWatchItems
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { MergedTickerSymbolType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useMemo, useState } from "react";

import styles from "./market-watch.module.scss";

interface Props {
  items: MergedTickerSymbolType[];
}
const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
  children
}) => (
  <div onClick={onClick} className={styles["market-watch-favorite-button"]}>
    {children}
  </div>
);

const _MarketWatch: React.FC<Props> = ({ items }) => {
  const { terminalType } = useContext(TerminalInfoContext);
  const [column, setColumn] = useState<string>(CHANGE_COLUMN);
  const [search, setSearch] = useState<string>("");
  const initFiltering = terminalType === "spot" ? "margin" : undefined;
  const [filteringType, setFilteringType] = useState<FilteringVariant>(
    initFiltering
  );
  const [sorting, setSorting] = useState<SortingType>({
    dataType: "string",
    direction: SORTING_DIRECTION.ASC,
    field: "name"
  });
  const [filtering, setFiltering] = useState<FilteringType>({
    field: "symbol",
    value: "BTC"
  });

  const filteringFunction = useMemo(
    () => getFilteringFunction(filteringType, filtering),
    [filteringType, filtering]
  );

  return (
    <>
      <Row size={"small"}>
        <GlobalSearchInput
          autoFocus={false}
          size={"small"}
          query={search}
          onChange={setSearch}
          canClose={false}
        />
      </Row>
      <Row size={"small"}>
        <RowItem>
          <Container
            onClick={() => {
              filteringType === "favorites"
                ? setFilteringType(initFiltering)
                : setFilteringType("favorites");
            }}
          >
            <FavoriteIcon selected={filteringType === "favorites"} />
          </Container>
        </RowItem>
        {terminalType === "spot" && (
          <>
            {FILTERING_CURRENCIES.map(currency => (
              <RowItem>
                <Button
                  noPadding
                  disabled={
                    filteringType === "symbol" && filtering.value === currency
                  }
                  variant={"text"}
                  size={"small"}
                  onClick={() => {
                    setFilteringType("symbol");
                    setFiltering({ value: currency });
                  }}
                >
                  {currency}
                </Button>
              </RowItem>
            ))}
            <RowItem>
              <Button
                noPadding
                disabled={filteringType === "ALTS"}
                variant={"text"}
                size={"small"}
                onClick={() => {
                  setFilteringType("ALTS");
                }}
              >
                ALTS
              </Button>
            </RowItem>
            <RowItem>
              <Button
                noPadding
                disabled={filteringType === "FIATS"}
                variant={"text"}
                size={"small"}
                onClick={() => {
                  setFilteringType("FIATS");
                }}
              >
                FIATS
              </Button>
            </RowItem>
          </>
        )}
      </Row>
      <Row size={"small"}>
        <Select
          fixedWidth={false}
          size={"small"}
          name="column"
          value={column}
          onChange={(e: ISelectChangeEvent) => setColumn(e.target.value)}
        >
          {COLUMN_VALUES.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </Select>
      </Row>
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
                field={"baseVolume"}
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
              .filter(filteringFunction)
              .filter(filterForSearch(search))
              .sort(sortMarketWatchItems(sorting))
              .map(
                ({
                  isFavorite,
                  eventTime,
                  quoteAsset,
                  baseAsset,
                  baseVolume,
                  name,
                  lastPrice,
                  priceChange,
                  priceChangePercent
                }) => (
                  <MarketWatchRow
                    isFavorite={isFavorite}
                    eventTime={eventTime}
                    quoteAsset={quoteAsset}
                    baseAsset={baseAsset}
                    column={column}
                    volume={baseVolume}
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

export const MarketWatch = React.memo(_MarketWatch);
