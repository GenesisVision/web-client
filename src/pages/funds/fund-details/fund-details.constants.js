import { composeDefaultDateRangeFilter } from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "../../../modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValue } from "../../../modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";
export const FUND_REBALANCING_SORTING = "ByDateDesc";
export const FUND_REBALANCING_COLUMNS = [
  {
    name: "name"
  },
  {
    name: "symbol"
  },
  {
    name: "assertPart"
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
