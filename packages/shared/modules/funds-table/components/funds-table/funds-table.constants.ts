import {
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  DateRangeFilterTypes
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc,
  validateDateRange
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "statisticDateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "statisticDateTo";

export const SORTING_FILTER_VALUE = "ByProfitDesc";

export const FUNDS_TABLE_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      ),
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DateRangeFilterTypes.lastMonth
      }
    }),
    validate: validateDateRange
  }
];

export const FUNDS_TABLE_COLUMNS: SortingColumn[] = [
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
  },
  {
    name: "favourite"
  }
];

export const sortableColumns: string[] = FUNDS_TABLE_COLUMNS.filter(
  x => !!x.sortingName
).map(x => x.sortingName as string);

export const DEFAULT_ITEMS_ON_PAGE = 12;
