import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValue } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const FUND_STRUCTURE_COLUMNS = [
  {
    name: "asset"
  },
  {
    name: "symbol"
  },
  {
    name: "target"
  },
  {
    name: "current"
  }
];

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";
export const FUND_REBALANCING_COLUMNS = [
  {
    name: "from"
  },
  {
    name: "to"
  },
  {
    name: "assets"
  }
];

export const FUND_REBALANCING_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValue(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const FUND_REBALANCING_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};
