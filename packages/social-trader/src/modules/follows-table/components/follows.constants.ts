import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "components/table/components/filtering/tag-filter/tag-filter.constants";
import { CURRENCY_MAP_VALUE } from "modules/programs-table/components/programs-table/programs.constants";

export const CURRENCY_MAP_NAME = "showIn";

export const FOLLOW_COLUMNS: SortingColumn[] = [
  {
    name: "name",
    sortingName: "ByTitle"
  },
  {
    name: "subscribers",
    sortingName: "BySubscribers"
  },
  {
    name: "age"
  },
  {
    name: "trades",
    sortingName: "ByTrades"
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
