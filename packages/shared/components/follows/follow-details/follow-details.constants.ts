import { ACTION_STATUS_FILTER_TYPES } from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export const PROGRAM_TRADES_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const PROGRAM_TRADES_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const SUBSCRIBERS_STATUS_TYPE = "status";

export const PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS = [
  {
    name: SUBSCRIBERS_STATUS_TYPE,
    type: FILTER_TYPE.GENERAL
  }
];

export const PROGRAM_SUBSCRIBERS_FILTERS = {
  [SUBSCRIBERS_STATUS_TYPE]: ACTION_STATUS_FILTER_TYPES.ACTIVE
};

export const GM_NAME = "Genesis Markets";
