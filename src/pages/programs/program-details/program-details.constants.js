import { composeDefaultDateRangeFilter } from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const PROGRAM_TRADES_SORTING = "ByDateDesc";
export const PROGRAM_TRADES_COLUMNS = [
  {
    name: "direction"
  },
  {
    name: "symbol"
  },
  {
    name: "volume"
  },
  {
    name: "price"
  },
  {
    name: "profit"
  },
  {
    name: "date"
  },
  {
    name: "ticket"
  },
  {
    name: "entry"
  }
];

export const PROGRAM_TRADES_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  }
];
