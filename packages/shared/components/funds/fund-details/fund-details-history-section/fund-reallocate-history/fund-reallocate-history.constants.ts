import {
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const REALLOCATE_HISTORY_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const REALLOCATE_HISTORY_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};
