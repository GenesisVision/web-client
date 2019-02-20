import {
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  DateRangeFilterTypes
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const DASHBOARD_COPYTRADING_COLUMNS = [
  {
    name: "program"
  },
  {
    name: "start-date"
  },
  {
    name: "subscribers"
  },
  {
    name: "trades"
  },
  {
    name: "profit"
  },
  {
    name: "chart"
  }
];

export const DASHBOARD_COPYTRADING_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DateRangeFilterTypes.lastMonth
      }
    })
  }
];

export const DASHBOARD_COPYTRADING_DEFAULT_FILTERING = {
  dateRange: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DateRangeFilterTypes.lastMonth
  }
};
