import { ACTION_STATUS_FILTER_TYPES } from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

export const SET_FOLLOW_STATISTIC_PERIOD = "SET_FOLLOW_STATISTIC_PERIOD";
export const SET_FOLLOW_STATISTIC_CURRENCY = "SET_FOLLOW_STATISTIC_CURRENCY";
export const FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART =
  "FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART";
export const FETCH_FOLLOW_PROFIT_CHART = "FETCH_FOLLOW_PROFIT_CHART";
export const FETCH_FOLLOW_BALANCE_CHART = "FETCH_FOLLOW_BALANCE_CHART";
export const FETCH_FOLLOW_DESCRIPTION = "FETCH_FOLLOW_DESCRIPTION";
export const SET_FOLLOW_ID = "SET_FOLLOW_ID";

export const FOLLOW_OPEN_POSITIONS = "FOLLOW_OPEN_POSITIONS";
export const FOLLOW_TRADES = "FOLLOW_TRADES";
export const FOLLOW_SUBSCRIPTIONS = "FOLLOW_SUBSCRIPTIONS";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export const FOLLOW_TRADES_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const FOLLOW_TRADES_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const SUBSCRIBERS_STATUS_TYPE = "status";

export const FOLLOW_SUBSCRIBERS_DEFAULT_FILTERS = [
  {
    name: SUBSCRIBERS_STATUS_TYPE,
    type: FILTER_TYPE.GENERAL
  }
];

export const FOLLOW_SUBSCRIBERS_FILTERS = {
  [SUBSCRIBERS_STATUS_TYPE]: ACTION_STATUS_FILTER_TYPES.ACTIVE
};
