import { ACTION_STATUS_FILTER_TYPES } from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";
import {
  INTERVAL_FILTER_NAME,
  INTERVAL_FILTER_VALUES
} from "pages/invest/programs/program-details/program-history-section/interval-filter";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export const GET_PROGRAM_PERIOD_HISTORY = "GET_PROGRAM_PERIOD_HISTORY";
export const SET_PROGRAM_STATISTIC_PERIOD = "SET_PROGRAM_STATISTIC_PERIOD";
export const SET_PROGRAM_STATISTIC_CURRENCY = "SET_PROGRAM_STATISTIC_CURRENCY";
export const FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART =
  "FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART";
export const FETCH_PROGRAM_PROFIT_CHART = "FETCH_PROGRAM_PROFIT_CHART";
export const FETCH_PROGRAM_BALANCE_CHART = "FETCH_PROGRAM_BALANCE_CHART";
export const FETCH_PROGRAM_DESCRIPTION = "FETCH_PROGRAM_DESCRIPTION";

export const PROGRAM_OPEN_POSITIONS = "PROGRAM_OPEN_POSITIONS";
export const PROGRAM_TRADES = "PROGRAM_TRADES";
export const PROGRAM_FINANCIAL_STATISTIC = "PROGRAM_FINANCIAL_STATISTIC";
export const PROGRAM_SUBSCRIPTIONS = "PROGRAM_SUBSCRIPTIONS";

export const generateProgramTradesColumns = (
  hideSwaps?: boolean,
  hideTickets?: boolean
) =>
  PROGRAM_TRADES_COLUMNS.filter(
    column =>
      (hideSwaps ? column.name !== "swap" : true) &&
      (hideTickets ? column.name !== "ticket" : true)
  );

export const PROGRAM_TRADING_LOG_COLUMNS: SortingColumn[] = [
  {
    name: "date",
    sortingName: "ByDate"
  },
  {
    name: "message"
  }
];
export const PROGRAM_TRADES_COLUMNS: SortingColumn[] = [
  {
    name: "direction-entry",
    sortingName: "ByDirection",
    tooltip: true
  },
  {
    name: "symbol",
    sortingName: "BySymbol",
    tooltip: true
  },
  {
    name: "volume",
    sortingName: "ByVolume",
    tooltip: true
  },
  {
    name: "price",
    sortingName: "ByPrice",
    tooltip: true
  },
  {
    name: "profit",
    sortingName: "ByProfit",
    tooltip: true
  },
  {
    name: "commission",
    sortingName: "ByCommission",
    tooltip: true
  },
  {
    name: "swap",
    sortingName: "BySwap",
    tooltip: true
  },
  {
    name: "date",
    sortingName: "ByDate",
    tooltip: true
  },
  {
    name: "ticket",
    sortingName: "ByTicket",
    tooltip: true
  },
  {
    name: "buttons"
  }
];
export const PROGRAM_OPEN_POSITIONS_COLUMNS: SortingColumn[] = [
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
  }
  /*{
    name: "profitPercent",
    sortingName: "ByProfitPercent"
  }*/
];

export const PROGRAM_SUBSCRIBERS_COLUMNS: SortingColumn[] = [
  {
    name: "number",
    tooltip: true
  },
  {
    name: "trades",
    tooltip: true
  },
  {
    name: "profit",
    tooltip: true
  },
  {
    name: "commission",
    tooltip: true
  },
  {
    name: "volume",
    tooltip: true
  },
  {
    name: "subscriptionDate"
  },
  {
    name: "unsubscriptionDate"
  },
  {
    name: "status",
    tooltip: true
  }
];

export const EXCHANGE_PROGRAM_FINANCIAL_STATISTIC_COLUMNS: SortingColumn[] = [
  {
    name: "date-start",
    tooltip: true
  },
  {
    name: "period-length",
    tooltip: true
  },
  {
    name: "balance",
    tooltip: true
  },
  {
    name: "profit",
    tooltip: true
  },
  {
    name: "success-fee",
    tooltip: true
  },
  {
    name: "management-fee",
    tooltip: true
  },
  {
    name: "deposit-withdraw",
    tooltip: true
  }
];

export const PROGRAM_FINANCIAL_STATISTIC_COLUMNS: SortingColumn[] = [
  {
    name: "period",
    tooltip: true
  },
  {
    name: "date-start",
    tooltip: true
  },
  {
    name: "balance",
    tooltip: true
  },
  {
    name: "profit",
    tooltip: true
  },
  {
    name: "success-fee",
    tooltip: true
  },
  {
    name: "management-fee",
    tooltip: true
  },
  {
    name: "deposit-withdraw",
    tooltip: true
  }
];

export const PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS: SortingColumn[] = [
  ...PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  {
    name: "commission-rebate",
    tooltip: true
  }
];

export const PROGRAM_ANALYTICS: SortingColumn[] = [
  {
    name: "date-start",
    tooltip: true
  },
  {
    name: "period-length",
    tooltip: true
  },
  {
    name: "balance",
    tooltip: true
  },
  {
    name: "profit",
    tooltip: true
  },
  {
    name: "investors-max",
    tooltip: true
  }
];

export const PROGRAM_PERIOD_HISTORY: SortingColumn[] = [
  {
    name: "period",
    tooltip: true
  },
  {
    name: "date-start",
    tooltip: true
  },
  {
    name: "period-length",
    tooltip: true
  },
  {
    name: "balance",
    tooltip: true
  },
  {
    name: "profit",
    tooltip: true
  },
  {
    name: "investors",
    tooltip: true
  }
];

export const PROGRAM_FINANCIAL_STATISTIC_DEFAULT_FILTERS = [
  {
    name: INTERVAL_FILTER_NAME,
    type: FILTER_TYPE.GENERAL
  },
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const PROGRAM_FINANCIAL_STATISTIC_FILTERS = {
  [INTERVAL_FILTER_NAME]: INTERVAL_FILTER_VALUES[0].value,
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const PROGRAM_TRADES_DEFAULT_FILTERS = [
  {
    name: INTERVAL_FILTER_NAME,
    type: FILTER_TYPE.GENERAL
  },
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const PROGRAM_TRADES_FILTERS = {
  [INTERVAL_FILTER_NAME]: INTERVAL_FILTER_VALUES[0].value,
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const SUBSCRIBERS_STATUS_TYPE = "status";

export const PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS = [
  {
    name: SUBSCRIBERS_STATUS_TYPE,
    type: FILTER_TYPE.GENERAL
  }
];

export const PROGRAM_SUBSCRIBERS_FILTERS = {
  [SUBSCRIBERS_STATUS_TYPE]: ACTION_STATUS_FILTER_TYPES.ACTIVE
};
