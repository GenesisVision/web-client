import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { programsTagFilter } from "shared/components/table/components/filtering/tag-filter/tag-filter.helpers";
import { IComposeDefaultFilter } from "shared/components/table/components/table.types";
import {
  CURRENCY_MAP_VALUE,
  programsCurrencyMap,
  programsDateRangeFilter
} from "shared/modules/programs-table/components/programs-table/programs.constants";

export const LEVEL_FILTER_NAME = "level";
export const PROGRAM_CURRENCY_FILTER_NAME = "programCurrency";
export const CURRENCY_MAP_NAME = "currency";
export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SORTING_FILTER_VALUE = "ByProfitDesc";

export const FOLLOW_TABLE_FILTERS: IComposeDefaultFilter[] = [
  programsCurrencyMap,
  programsTagFilter,
  programsDateRangeFilter
];

export const FOLLOW_COLUMNS: SortingColumn[] = [
  {
    name: "name"
  },
  {
    name: "subscribers"
  },
  {
    name: "age"
  },
  {
    name: "trades"
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

export const DEFAULT_FOLLOW_TABLE_FILTERS = {
  [CURRENCY_MAP_NAME]: CURRENCY_MAP_VALUE,
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [TAG_FILTER_NAME]: TAG_FILTER_DEFAULT_VALUE
};
