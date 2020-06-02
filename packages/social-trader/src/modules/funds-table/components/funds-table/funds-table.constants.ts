import {
  ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc,
  validateDateRange
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  FUND_ASSET_DEFAULT_VALUE,
  FUND_ASSET_FILTER_NAME
} from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import { fundAssetFilter } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.helpers";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

export const SORTING_FILTER_VALUE = "ByProfitDesc";
export const CURRENCY_MAP_NAME = "showIn";

export const CURRENCY_MAP_VALUE = undefined;

const fundsDateRangeFilter = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      DATE_RANGE_MIN_FILTER_NAME,
      DATE_RANGE_MIN_FILTER_NAME
    ),
    defaultValue: {
      ...DEFAULT_DATE_RANGE_FILTER_VALUE,
      type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
    }
  }),
  validate: validateDateRange
};

export const fundCurrencyMap = {
  name: CURRENCY_MAP_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: CURRENCY_MAP_VALUE
};

export const FUNDS_TABLE_FILTERS = [
  fundCurrencyMap,
  fundAssetFilter,
  fundsDateRangeFilter
];

export const FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "title",
    sortingName: "ByTitle",
    tooltip: true
  },
  {
    name: "balance",
    sortingName: "BySize",
    tooltip: true
  },
  {
    name: "assets",
    tooltip: true
  },
  {
    name: "investors",
    sortingName: "ByInvestors",
    tooltip: true
  },
  {
    name: "age",
    tooltip: true
  },
  {
    name: "drawdown",
    sortingName: "ByDrawdown",
    tooltip: true
  },
  {
    name: "profit",
    sortingName: "ByProfit",
    tooltip: true
  },
  {
    name: "chart"
  }
];

export const DEFAULT_ITEMS_ON_PAGE = 12;

export const DEFAULT_FUND_TABLE_FILTERS = {
  [CURRENCY_MAP_NAME]: CURRENCY_MAP_VALUE,
  [DATE_RANGE_FILTER_NAME]: ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  [FUND_ASSET_FILTER_NAME]: FUND_ASSET_DEFAULT_VALUE
};
