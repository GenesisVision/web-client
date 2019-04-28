import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  DateRangeFilterTypes
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

import { FILTER_TYPE } from "../table/helpers/filtering.helpers";
import {
  ACTION_STATUS_FILTER_DEFAULT_VALUE,
  ACTION_STATUS_FILTER_NAME
} from "./dashboard-assets/dashboard-programs/dashboard-programs.helpers";

export const DASHBOARD_PROGRAMS_SORTING = "ByProfitDesc";

export const DASHBOARD_PROGRAMS_FILTERS = [
  {
    type: FILTER_TYPE.GENERAL,
    name: ACTION_STATUS_FILTER_NAME,
    defaultValue: ACTION_STATUS_FILTER_DEFAULT_VALUE
  },
  {
    ...composeDefaultDateRangeFilter({
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DateRangeFilterTypes.lastMonth
      }
    })
  }
];

export const DASHBOARD_PROGRAMS_DEFAULT_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DateRangeFilterTypes.lastMonth
  },
  [ACTION_STATUS_FILTER_NAME]: ACTION_STATUS_FILTER_DEFAULT_VALUE
};

export const DASHBOARD_FUNDS_COLUMNS: SortingColumn[] = [
  {
    name: "title"
  },
  {
    name: "balance"
  },
  {
    name: "assets"
  },
  {
    name: "value"
  },
  {
    name: "drawdown"
  },
  {
    name: "profit"
  },
  {
    name: "chart"
  },
  {
    name: "status"
  }
];

export const DASHBOARD_FUNDS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DateRangeFilterTypes.lastMonth
      }
    })
  }
];

export const DASHBOARD_FUNDS_DEFAULT_FILTERING = {
  dateRange: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DateRangeFilterTypes.lastMonth
  }
};
