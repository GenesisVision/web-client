import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "components/table/components/filtering/filter.type";

export const FUND_STRUCTURE_COLUMNS: SortingColumn[] = [
  {
    name: "asset"
  },
  {
    name: "symbol"
  },
  {
    name: "target",
    tooltip: true
  },
  {
    name: "current",
    tooltip: true
  }
];

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export const FUND_REBALANCING_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const FUND_REBALANCING_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const FUND_REALLOCATE_HISTORY_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "reallocate-fund"
  }
];

export const SET_FUND_STATISTIC_PERIOD = "SET_FUND_STATISTIC_PERIOD";
export const SET_FUND_STATISTIC_CURRENCY = "SET_FUND_STATISTIC_CURRENCY";
export const FETCH_FUND_ABSOLUTE_PROFIT_CHART =
  "FETCH_FUND_ABSOLUTE_PROFIT_CHART";
export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";
export const SET_FUND_ID = "SET_FUND_ID";

export const FUND_REALLOCATE_HISTORY = "FUND_REALLOCATE_HISTORY";
export const FUND_STRUCTURE = "FUND_STRUCTURE";
