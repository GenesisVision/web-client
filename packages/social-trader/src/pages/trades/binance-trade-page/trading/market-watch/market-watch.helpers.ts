import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import {
  MergedTickerSymbolType,
  Symbol,
  Ticker,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { safeGetElemFromArray } from "utils/helpers";
import { AnyObjectType } from "utils/types";

export type SortingType = {
  dataType: "number" | "string";
  field: keyof MergedTickerSymbolType;
  direction: SORTING_DIRECTION;
};

export type FilteringType = {
  field?: keyof MergedTickerSymbolType;
  value?: any;
};

export const FILTERING_CURRENCIES = ["BTC", "BNB"];

export const CHANGE_COLUMN = "CHANGE_COLUMN";
export const VOLUME_COLUMN = "VOLUME_COLUMN";
export const COLUMN_VALUES = [
  { label: "Change", value: CHANGE_COLUMN },
  { label: "Volume", value: VOLUME_COLUMN }
];

export const getSymbolPrice = (
  items: MergedTickerSymbolType[],
  symbol: TradeCurrency
): string => {
  return safeGetElemFromArray(items, filterForSymbol(symbol)).lastPrice;
};

export const normalizeSymbolsList = (list: Symbol[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.symbol] = item));
  return initObject;
};

export const normalizeMarketList = (list: Ticker[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.symbol] = item));
  return initObject;
};

const getCorrectValue = (value: any, dataType: "number" | "string") => {
  return dataType === "string" ? value.toLowerCase() : +value;
};

export const sortMarketWatchItems = ({
  dataType,
  field,
  direction = SORTING_DIRECTION.NONE
}: SortingType) => (
  a: MergedTickerSymbolType,
  b: MergedTickerSymbolType
): number => {
  if (!field) return 0;
  const correctA = getCorrectValue(a[field], dataType);
  const correctB = getCorrectValue(b[field], dataType);
  switch (direction) {
    case SORTING_DIRECTION.ASC:
      if (correctA < correctB) return -1;
      else return 1;
    case SORTING_DIRECTION.DESC:
      if (correctA > correctB) return -1;
      else return 1;
    case SORTING_DIRECTION.NONE:
      return 0;
  }
};

export const filterForSymbol = (value: string) => (
  item: MergedTickerSymbolType
): boolean => {
  if (value === undefined) return true;
  return item.quoteAsset === value;
};

export const filterMarketWatchItemsForMargin = (
  item: MergedTickerSymbolType
): boolean => {
  return item.isMarginTradingAllowed;
};

export const getFilteringFunction = (
  filteringType: "margin" | "symbol",
  filtering: FilteringType
): ((item: MergedTickerSymbolType) => boolean) => {
  switch (filteringType) {
    case "margin":
      return filterMarketWatchItemsForMargin;
    case "symbol":
      return filterForSymbol(filtering.value);
  }
};

export const filterForSearch = (
  query: string,
  field: keyof MergedTickerSymbolType = "baseAsset"
) => (item: MergedTickerSymbolType): boolean => {
  if (!query) return true;
  return String(item[field])
    .toLowerCase()
    .includes(query.toLowerCase());
};
