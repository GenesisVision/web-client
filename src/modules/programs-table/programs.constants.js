import { FilterType } from "../filtering/filtering.constants";

export const LEVEL_FILTER_NAME = "level";
export const CURRENCY_FILTER_NAME = "currency";
export const DATE_RANGE_FILTER_NAME = "dateRange";
export const SORTING_FILTER_NAME = "sorting";

export const SERVER_LEVEL_MIN_FILTER_NAME = "levelMin";
export const SERVER_LEVEL_MAX_FILTER_NAME = "levelMax";
export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateRangeStart";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateRangeEnd";

export const LEVEL_MIN_FILTER_VALUE = 1;
export const LEVEL_MAX_FILTER_VALUE = 7;

export const SORTING_FILTER_VALUE = "ByProfitDesc";
export const CURRENCY_FILTER_VALUE = undefined;

export const CURRENCY_FILTER_VALUES = [
  "GVT",
  "ETH",
  "BTC",
  "ADA",
  "USD",
  "EUR"
];

export const PROGRAMS_DEFAULT_FILTERS = [
  {
    name: LEVEL_FILTER_NAME,
    type: FilterType.range,
    value: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE],
    validate: value => {
      const levelRegex = /[0-7]/;
      if (Array.isArray(value) && value.length === 2) {
        const [a, b] = value;
        return levelRegex.test(a) && levelRegex.test(b) && a < b;
      }
      return false;
    }
  },
  {
    name: CURRENCY_FILTER_NAME,
    type: FilterType.general,
    value: CURRENCY_FILTER_VALUE,
    validate: value => CURRENCY_FILTER_VALUES.includes(value)
  } /*,
  {
    name: DATE_RANGE_FILTER_NAME,
    value: [undefined, undefined]
  }*/
];

export const PROGRAMS_COLUMNS = [
  {
    name: "title"
  },
  {
    name: "balance",
    sortingName: "ByBalance"
  },
  {
    name: "currency"
  },
  {
    name: "investors",
    sortingName: "ByInvestors"
  },
  {
    name: "available-to-invest"
  },
  {
    name: "trades",
    sortingName: "ByTrades"
  },
  {
    name: "period",
    sortingName: "ByEndOfPeriod"
  },
  {
    name: "drawdown",
    sortingName: "ByDrawdown"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "chart",
    isSortable: false
  }
];
