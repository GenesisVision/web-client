import {
  ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_MAX_FILTER_NAME,
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
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "components/table/components/filtering/tag-filter/tag-filter.constants";
import { programsTagFilter } from "components/table/components/filtering/tag-filter/tag-filter.helpers";
import { IComposeDefaultFilter } from "components/table/components/table.types";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

export const LEVEL_FILTER_NAME = "level";
export const PROGRAM_CURRENCY_FILTER_NAME = "programCurrency";
export const CURRENCY_MAP_NAME = "showIn";

export const LEVEL_MIN_FILTER_VALUE = 1;
export const LEVEL_MAX_FILTER_VALUE = 7;

export const SORTING_FILTER_VALUE = "ByProfitDesc";
export const CURRENCY_FILTER_VALUE = undefined;
export const CURRENCY_MAP_VALUE = undefined;

export const programsLevelFilter = {
  name: LEVEL_FILTER_NAME,
  type: FILTER_TYPE.RANGE,
  defaultValue: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE],
  validate: (value: string[]) => {
    const levelRegex = /[0-7]/;
    if (Array.isArray(value) && value.length === 2) {
      const [a, b] = value;
      return levelRegex.test(a) && levelRegex.test(b);
    }
    return false;
  }
};

export const programsCurrencyFilter = {
  name: PROGRAM_CURRENCY_FILTER_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: CURRENCY_FILTER_VALUE
};

export const programsCurrencyMap = {
  name: CURRENCY_MAP_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: CURRENCY_MAP_VALUE
};

export const programsDateRangeFilter = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      DATE_RANGE_MIN_FILTER_NAME,
      DATE_RANGE_MAX_FILTER_NAME
    ),
    defaultValue: {
      ...DEFAULT_DATE_RANGE_FILTER_VALUE,
      type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
    }
  }),
  validate: validateDateRange
};

export const PROGRAMS_TABLE_FILTERS: IComposeDefaultFilter[] = [
  programsCurrencyMap,
  programsTagFilter,
  programsLevelFilter,
  programsCurrencyFilter,
  programsDateRangeFilter
];

export const PROGRAMS_COLUMNS: SortingColumn[] = [
  {
    name: "title",
    sortingName: "ByTitle"
  },
  {
    name: "equity",
    sortingName: "ByEquity"
  },
  {
    name: "investors",
    sortingName: "ByInvestors"
  },
  {
    name: "available-to-invest"
  },
  {
    name: "period",
    sortingName: " ByPeriod"
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

export const DEFAULT_PROGRAM_TABLE_FILTERS = {
  [CURRENCY_MAP_NAME]: CURRENCY_MAP_VALUE,
  [DATE_RANGE_FILTER_NAME]: ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  [TAG_FILTER_NAME]: TAG_FILTER_DEFAULT_VALUE,
  [LEVEL_FILTER_NAME]: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE],
  [PROGRAM_CURRENCY_FILTER_NAME]: CURRENCY_FILTER_VALUE
};
