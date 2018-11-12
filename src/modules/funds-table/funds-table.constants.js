import {
  composeDefaultDateRangeFilter,
  composeRequestValue,
  validateDateRange
} from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const DATE_RANGE_FILTER_NAME = "dateRange";
export const SORTING_FILTER_NAME = "sorting";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "statisticDateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "statisticDateTo";

export const SORTING_FILTER_VALUE = "ByProfitDesc";

export const FUNDS_TABLE_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValue(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    }),
    validate: validateDateRange
  }
];

export const FUNDS_TABLE_COLUMNS = [
  {
    name: "title"
  },
  {
    name: "balance",
    sortingName: "ByBalance"
  },
  {
    name: "assets"
  },
  {
    name: "investors",
    sortingName: "ByInvestors"
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
    name: "chart"
  }
];
