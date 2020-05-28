import {
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

export const MANAGER_TABLE_DATE_RANGE_FILTER = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      DATE_RANGE_MIN_FILTER_NAME,
      DATE_RANGE_MAX_FILTER_NAME
    )
  }),
  validate: validateDateRange
};

export const MANAGER_DEFAULT_FILTERS = [MANAGER_TABLE_DATE_RANGE_FILTER];
export const MANAGER_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATA_RANGE_FILTER_TYPES.ALL
  }
};

export const MANAGER_SORTING = "ByProfitDesc";

export enum MANAGER_HISTORY_TAB {
  FOLLOW = "follow",
  PROGRAMS = "programs",
  FUNDS = "funds"
}
