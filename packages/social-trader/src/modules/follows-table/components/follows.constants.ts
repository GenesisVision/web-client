import {
  ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  DATE_RANGE_FILTER_NAME
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "components/table/components/filtering/tag-filter/tag-filter.constants";
import { programsTagFilter } from "components/table/components/filtering/tag-filter/tag-filter.helpers";
import { IComposeDefaultFilter } from "components/table/components/table.types";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";
import {
  CURRENCY_MAP_VALUE,
  programsCurrencyMap,
  programsDateRangeFilter
} from "modules/programs-table/components/programs-table/programs.constants";

export const CURRENCY_MAP_NAME = "showIn";

export const SORTING_FILTER_VALUE = "ByProfitDesc";

const METATRADER = "MetaTrader";
const EXTERNAL = "External";
const CRYPTO = "Crypto";

const FOLLOW_TYPE_FILTER_VALUE = undefined;

export const FOLLOW_TYPES = [METATRADER, EXTERNAL, CRYPTO];

export const FOLLOW_TYPE_FILTER_NAME = "type";

export const followTypeFilter = {
  name: FOLLOW_TYPE_FILTER_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: FOLLOW_TYPE_FILTER_VALUE
};

export const FOLLOW_TABLE_FILTERS: IComposeDefaultFilter[] = [
  programsCurrencyMap,
  programsTagFilter,
  programsDateRangeFilter
];

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
  [DATE_RANGE_FILTER_NAME]: ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  [TAG_FILTER_NAME]: TAG_FILTER_DEFAULT_VALUE
};
