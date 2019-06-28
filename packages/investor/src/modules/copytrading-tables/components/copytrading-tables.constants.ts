import {
  DATA_RANGE_FILTER_TYPES,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const COPYTRADING_OPEN_TRADES_COLUMNS = [
  {
    name: "providers"
  },
  {
    name: "date-open"
  },
  {
    name: "symbol"
  },
  {
    name: "direction"
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
  }
];

export const COPYTRADING_TRADES_HISTORY_COLUMNS = [
  {
    name: "providers"
  },
  {
    name: "date"
  },
  {
    name: "direction-entry"
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
    name: "commission"
  }
];

export const COPYTRADING_TRADES_HISTORY_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      // add name prop to fix crush
      composeApiRequestValue: composeRequestValueFunc("dateFrom", "dateTo"),
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

export const DECIMAL_SCALE = 8;
