export const PROGRAMS_ROUTE = "/programs";

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
export const CURRENCY_FILTER_VALUE = "ALL";

export const PROGRAMS_DEFAULT_FILTERS = [
  {
    name: LEVEL_FILTER_NAME,
    value: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE]
  },
  {
    name: CURRENCY_FILTER_NAME,
    value: CURRENCY_FILTER_VALUE
  },
  {
    name: DATE_RANGE_FILTER_NAME,
    value: [undefined, undefined]
  }
];

export const PROGRAMS_COLUMNS = [
  {
    name: "name",
    isSortable: false
  },
  {
    name: "balance",
    isSortable: true
  }
];
