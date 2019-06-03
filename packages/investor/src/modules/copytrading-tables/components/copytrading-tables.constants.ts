import {
  DATA_RANGE_FILTER_TYPES,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const COPYTRADING_OPEN_TRADES_COLUMNS = [
  {
    name: "providers"
  },
  {
    name: "symbol"
  },
  {
    name: "volume"
  },
  {
    name: "price-open"
  },
  {
    name: "price"
  },
  {
    name: "profit"
  },
  {
    name: "close"
  }
];

export const COPYTRADING_TRADES_HISTORY_COLUMNS = [
  {
    name: "program"
  },
  {
    name: "manager"
  },
  {
    name: "direction"
  },
  {
    name: "open-date"
  },
  {
    name: "close-date"
  },
  {
    name: "symbol"
  },
  {
    name: "volume"
  },
  {
    name: "open-price"
  },
  {
    name: "close-price"
  },
  {
    name: "profit"
  }
];

export const COPYTRADING_TRADES_HISTORY_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      // add name prop to fix crush
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DATA_RANGE_FILTER_TYPES.LAST_MOUTH
      }
    })
  }
];

export const COPYTRADING_TRADES_HISTORY_DEFAULT_FILTERING = {
  dateRange: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATA_RANGE_FILTER_TYPES.LAST_MOUTH
  }
};
