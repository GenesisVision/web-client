import {
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "../../modules/funds-table/components/funds-table/funds-table.constants";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "../table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValue,
  validateDateRange
} from "../table/components/filtering/date-range-filter/date-range-filter.helpers";

export const FUNDS_TABLE_DATE_RANGE_FILTER = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValue(
      SERVER_DATE_RANGE_MIN_FILTER_NAME,
      SERVER_DATE_RANGE_MAX_FILTER_NAME
    )
  }),
  validate: validateDateRange
};

export const FUND_DEFAULT_FILTERS = [FUNDS_TABLE_DATE_RANGE_FILTER];
export const FUND_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE
};
