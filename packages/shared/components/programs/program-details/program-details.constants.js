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
    name: "date",
    sortingName: "ByDate"
  },
  {
    name: "symbol",
    sortingName: "BySymbol"
  },
  {
    name: "direction",
    sortingName: "ByDirection"
  },
  {
    name: "volume",
    sortingName: "ByVolume"
  },
  {
    name: "price",
    sortingName: "ByPrice"
  },
  {
    name: "priceCurrent",
    sortingName: "ByPriceCurrent"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "profitPercent",
    sortingName: "ByProfitPercent"
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
