import {
  ACTION_STATUS_FILTER_DEFAULT_VALUE,
  ACTION_STATUS_FILTER_NAME
} from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

export const DASHBOARD_COPYTRADING_COLUMNS = [
  {
    name: "program"
  },
  {
    name: "currency"
  },
  {
    name: "trades"
  },
  {
    name: "subscription"
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

export const DASHBOARD_COPYTRADING_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
      }
    })
  },
  {
    type: FILTER_TYPE.GENERAL,
    name: ACTION_STATUS_FILTER_NAME,
    defaultValue: ACTION_STATUS_FILTER_DEFAULT_VALUE
  }
];

export const DASHBOARD_COPYTRADING_DEFAULT_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
  },
  [ACTION_STATUS_FILTER_NAME]: ACTION_STATUS_FILTER_DEFAULT_VALUE
};
