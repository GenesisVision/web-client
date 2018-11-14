import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

export const DASHBOARD_PROGRAMS_COLUMNS = [
  {
    name: "title"
  },
  {
    name: "share"
  },
  {
    name: "currency"
  },
  {
    name: "time-left"
  },
  {
    name: "value"
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

export const DASHBOARD_PROGRAMS_SORTING = "ByProfitDesc";

export const DASHBOARD_PROGRAMS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  }
];

export const DASHBOARD_PROGRAMS_DEFAULT_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const DASHBOARD_FUNDS_COLUMNS = [
  {
    name: "title"
  },
  {
    name: "balance"
  },
  {
    name: "assets"
  },
  {
    name: "investors"
  },
  {
    name: "drawdown"
  },
  {
    name: "profit"
  },
  {
    name: "chart"
  }
];

export const DASHBOARD_FUNDS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  }
];

export const DASHBOARD_FUNDS_DEFAULT_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};
