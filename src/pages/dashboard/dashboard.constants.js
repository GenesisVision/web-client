import { composeDefaultDateRangeFilter } from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

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

export const DASHBOARD_PROGRAMS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  }
];

export const DASHBOARD_FUNDS_TABLE_COLUMNS = [
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
