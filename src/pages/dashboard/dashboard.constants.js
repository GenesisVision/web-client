import { composeDefaultDateRangeFilter } from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const DASHBOARD_PROGRAMS_COLUMNS = [
  {
    name: "title"
  },
  {
    name: "share",
    sortingName: "ByShare"
  },
  {
    name: "currency",
    sortingName: "ByCurr"
  },
  {
    name: "period"
  },
  {
    name: "value",
    sortingName: "ByValue"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "chart"
  },
  {
    name: "status"
  }
];

export const DASHBOARD_PROGRAMS_SORTING = "ByProfitDesc";

export const DASHBOARD_PROGRAMS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  }
];
