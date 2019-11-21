import {
  DATA_RANGE_FILTER_TYPES,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  SERVER_STATISTIC_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_STATISTIC_DATE_RANGE_MIN_FILTER_NAME
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc,
  validateDateRange
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { fundAssetFilter } from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter.helpers";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

import {
  FUND_ASSET_DEFAULT_VALUE,
  FUND_ASSET_FILTER_NAME
} from "../../../../components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";

export const FUND_CURRENCY_FILTER_NAME = "fundCurrency";
export const DATE_RANGE_FILTER_NAME = "dateRange";
export const SORTING_FILTER_VALUE = "ByProfitDesc";
export const CURRENCY_MAP_NAME = "showIn";

export const CURRENCY_MAP_VALUE = undefined;

const fundsDateRangeFilter = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      SERVER_STATISTIC_DATE_RANGE_MIN_FILTER_NAME,
      SERVER_STATISTIC_DATE_RANGE_MAX_FILTER_NAME
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
    sortingName: "ByTitle"
  },
  {
    name: "balance",
    sortingName: "BySize"
  },
  {
    name: "assets"
  },
  {
    name: "investors",
    sortingName: "ByInvestors"
  },
  {
    name: "age"
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

export const sortableColumns: string[] = FUNDS_TABLE_COLUMNS.filter(
  x => !!x.sortingName
).map(x => x.sortingName as string);

export const DEFAULT_ITEMS_ON_PAGE = 12;

export const DEFAULT_FUND_TABLE_FILTERS = {
  [CURRENCY_MAP_NAME]: CURRENCY_MAP_VALUE,
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [FUND_ASSET_FILTER_NAME]: FUND_ASSET_DEFAULT_VALUE
};
