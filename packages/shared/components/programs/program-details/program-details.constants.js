import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { composeRequestValue } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";
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
export const PROGRAM_OPEN_POSITIONS_COLUMNS = [
  {
    name: "date-open",
    sortingName: "date"
  },
  {
    name: "symbol",
    sortingName: "symbol"
  },
  {
    name: "direction",
    sortingName: "direction"
  },
  {
    name: "volume",
    sortingName: "volume"
  },
  {
    name: "price-open",
    sortingName: "priceOpen"
  },
  {
    name: "price",
    sortingName: "price"
  },
  {
    name: "profit",
    sortingName: "profit"
  },
  {
    name: "profit-percent",
    sortingName: "profitPercent"
  }
];

export const PROGRAM_TRADES_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValue(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const PROGRAM_TRADES_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};
