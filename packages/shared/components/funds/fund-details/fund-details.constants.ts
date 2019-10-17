import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

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
export const FUND_REBALANCING_COLUMNS: SortingColumn[] = [
  {
    name: "from"
  },
  {
    name: "to"
  },
  {
    name: "assets"
  }
];

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
