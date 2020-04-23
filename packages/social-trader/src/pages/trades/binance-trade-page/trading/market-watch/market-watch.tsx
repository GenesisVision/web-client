import GlobalSearchInput from "components/global-search/components/global-search-result/global-search-input";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Select, { ISelectChangeEvent } from "components/select/select";
import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { MarketWatchHeaderCell } from "pages/trades/binance-trade-page/trading/market-watch/market-watch-header-cell";
import { MarketWatchRow } from "pages/trades/binance-trade-page/trading/market-watch/market-watch-row";
import {
  CHANGE_COLUMN,
  COLUMN_VALUES,
  filterForSearch,
  FILTERING_CURRENCIES,
  FilteringType,
  getFilteringFunction,
  SortingType,
  sortMarketWatchItems
} from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useMemo, useState } from "react";

interface Props {
  items: MergedTickerSymbolType[];
}

const _MarketWatch: React.FC<Props> = ({ items }) => {
  const [column, setColumn] = useState<string>(CHANGE_COLUMN);
  const [search, setSearch] = useState<string>("");
  const [filteringType, setFilteringType] = useState<"margin" | "symbol">(
    "margin"
  );
  const [sorting, setSorting] = useState<SortingType>({
    dataType: "string",
    direction: SORTING_DIRECTION.ASC,
    field: "symbol"
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
      <Row>
        <RowItem>
          <GVButton
            disabled={filteringType === "margin"}
            variant={filteringType === "margin" ? "outlined" : "contained"}
            size={GV_BTN_SIZE.SMALL}
            onClick={() => {
              setFilteringType("margin");
            }}
          >
            Margin
          </GVButton>
        </RowItem>
        {FILTERING_CURRENCIES.map(currency => (
          <RowItem>
            <GVButton
              disabled={
                filteringType === "symbol" && filtering.value === currency
              }
              variant={
                filteringType === "symbol" && filtering.value === currency
                  ? "outlined"
                  : "contained"
              }
              size={GV_BTN_SIZE.SMALL}
              onClick={() => {
                setFilteringType("symbol");
                setFiltering({ value: currency });
              }}
            >
              {currency}
            </GVButton>
          </RowItem>
        ))}
      </Row>
      <Row>
        <RowItem>
          <GlobalSearchInput
            query={search}
            onChange={setSearch}
            canClose={false}
          />
        </RowItem>
        <RowItem>
          <Select
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
        </RowItem>
      </Row>
      <Row onlyOffset className="market-watch__items-container">
        <table>
          <thead>
            <MarketWatchHeaderCell
              dataType={"string"}
              sorting={sorting}
              setSorting={setSorting}
              field={"symbol"}
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
                field={"volume"}
              >
                Volume
              </MarketWatchHeaderCell>
            )}
          </thead>
          <tbody>
            {items
              .filter(filteringFunction)
              .filter(filterForSearch(search))
              .sort(sortMarketWatchItems(sorting))
              .map(
                ({
                  volume,
                  symbol,
                  lastPrice,
                  priceChange,
                  priceChangePercent
                }) => (
                  <MarketWatchRow
                    column={column}
                    volume={volume}
                    symbol={symbol}
                    lastPrice={lastPrice}
                    priceChange={priceChange}
                    priceChangePercent={priceChangePercent}
                  />
                )
              )}
          </tbody>
        </table>
      </Row>
    </>
  );
};

export const MarketWatch = React.memo(_MarketWatch);
