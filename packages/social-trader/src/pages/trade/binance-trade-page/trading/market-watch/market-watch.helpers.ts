import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import {
  MergedTickerSymbolType,
  Symbol,
  TerminalCurrency,
  Ticker
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { safeGetElemFromArray } from "utils/helpers";
import { AnyObjectType } from "utils/types";

export type FilteringVariant =
  | "favorites"
  | "ALTS"
  | "FIATS"
  | "margin"
  | "symbol"
  | undefined;

export type SortingType = {
  dataType: "number" | "string";
  field: keyof MergedTickerSymbolType;
  direction: SORTING_DIRECTION;
};

export type FilteringType = {
  field?: keyof MergedTickerSymbolType;
  value?: any;
};

export const ALTS_CURRENCIES = ["ETH", "TRX", "XRP"];
export const FIATS_CURRENCIES = [
  "USDT",
  "BUSD",
  "TUSD",
  "USDC",
  "PAX",
  "BKRW",
  "EUR",
  "IDRT",
  "NGN",
  "RUB",
  "TRY",
  "ZAR"
];

export const FILTERING_CURRENCIES = ["BTC", "BNB"];

export const CHANGE_COLUMN = "CHANGE_COLUMN";
export const VOLUME_COLUMN = "VOLUME_COLUMN";

export const SPOT_COLUMN_VALUES = [
  { label: "Change", value: CHANGE_COLUMN },
  { label: "24h Volume", value: VOLUME_COLUMN }
];

export const FUTURES_COLUMN_VALUES = [
  { label: "24h %", value: CHANGE_COLUMN },
  { label: "Volume", value: VOLUME_COLUMN }
];

export const getSymbolPrice = (
  items: MergedTickerSymbolType[],
  symbol: TerminalCurrency
) => {
  return safeGetElemFromArray(items, filterForSymbol(symbol)).lastPrice;
};

export const normalizeSymbolsList = (list: Symbol[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.name] = item));
  return initObject;
};

export const normalizeMarketList = (list: Ticker[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.symbol] = item));
  return initObject;
};

const getCorrectValue = (value: any, dataType: "number" | "string") => {
  return dataType === "string" ? (value ? value.toLowerCase() : value) : +value;
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

export const filterTrading = ({ status }: MergedTickerSymbolType) => {
  return status === "Trading";
};

export const filterForSymbol = (value: string) => (
  item: MergedTickerSymbolType
): boolean => {
  if (value === undefined) return true;
  return item.quoteAsset === value;
};

export const filterMarketWatchItemsForFavorites = (
  item: MergedTickerSymbolType
): boolean => {
  return !!item.isFavorite;
};

export const filterMarketWatchItemsForALTS = (
  item: MergedTickerSymbolType
): boolean => {
  return ALTS_CURRENCIES.includes(item.quoteAsset);
};

export const filterMarketWatchItemsForFIATS = (
  item: MergedTickerSymbolType
): boolean => {
  return FIATS_CURRENCIES.includes(item.quoteAsset);
};

export const filterMarketWatchItemsForMargin = (
  item: MergedTickerSymbolType
): boolean => {
  return item.isMarginTradingAllowed;
};

export const getFilteringFunction = (
  filteringType: FilteringVariant,
  filtering: FilteringType
): ((item: MergedTickerSymbolType) => boolean) => {
  switch (filteringType) {
    case "favorites":
      return filterMarketWatchItemsForFavorites;
    case "ALTS":
      return filterMarketWatchItemsForALTS;
    case "FIATS":
      return filterMarketWatchItemsForFIATS;
    case "margin":
      return filterMarketWatchItemsForMargin;
    case "symbol":
      return filterForSymbol(filtering.value);
    default:
      return () => true;
  }
};

export const filterForSearch = (
  query: string,
  field: keyof MergedTickerSymbolType = "symbol"
) => (item: MergedTickerSymbolType): boolean => {
  if (!query) return true;
  return String(item[field]).toLowerCase().includes(query.toLowerCase());
};
