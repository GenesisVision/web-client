import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  ComposedRequestEventTypeValue,
  EVENT_TYPE_FILTER_DEFAULT_VALUE,
  EventTypeFilterType
} from "components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import { IComposeDefaultFilter } from "components/table/components/table.types";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

export const FUND_STRUCTURE_COLUMNS: SortingColumn[] = [
  {
    name: "asset",
    tooltip: true
  },
  {
    name: "symbol",
    tooltip: true
  },
  {
    name: "amount"
  },
  {
    name: "target",
    tooltip: true
  },
  {
    name: "current",
    tooltip: true
  }
];

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export const FUND_REBALANCING_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const HISTORY_EVENT_TYPE_FILTER_NAME = "eventsType";
const HISTORY_EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";

export const composeDefaultHistoryEventTypeFilter = (): IComposeDefaultFilter => ({
  name: HISTORY_EVENT_TYPE_FILTER_NAME,
  composeRequestValue: (
    value: EventTypeFilterType
  ): ComposedRequestEventTypeValue => value,
  defaultValue: HISTORY_EVENT_TYPE_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
});

export const FUND_HISTORY_FILTERS = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [HISTORY_EVENT_TYPE_FILTER_NAME]: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

export const FUND_HISTORY_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  },
  { ...composeDefaultHistoryEventTypeFilter() }
];

export const FUND_REBALANCING_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const FUND_REALLOCATE_HISTORY_COLUMNS: SortingColumn[] = [
  {
    name: "date",
    tooltip: true
  },
  {
    name: "reallocate-fund",
    tooltip: true
  }
];

export const FUND_HISTORY_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "event"
  },
  {
    name: "description"
  }
];

export const FUND_HISTORY_INNER_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "trades"
  },
  {
    name: "commission"
  }
];

export const SET_FUND_STATISTIC_PERIOD = "SET_FUND_STATISTIC_PERIOD";
export const SET_FUND_STATISTIC_CURRENCY = "SET_FUND_STATISTIC_CURRENCY";
export const FETCH_FUND_ABSOLUTE_PROFIT_CHART =
  "FETCH_FUND_ABSOLUTE_PROFIT_CHART";
export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";
export const SET_FUND_ID = "SET_FUND_ID";

export const FUND_HISTORY = "FUND_HISTORY";
export const FUND_REALLOCATE_HISTORY = "FUND_REALLOCATE_HISTORY";
export const FUND_STRUCTURE = "FUND_STRUCTURE";
