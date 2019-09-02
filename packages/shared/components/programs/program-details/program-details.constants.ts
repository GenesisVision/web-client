import { ACTION_STATUS_FILTER_TYPES } from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";
export const PROGRAM_TRADES_SORTING = "ByDateDesc";

export const generateProgramTradesColumns = (
  hideSwaps?: boolean,
  hideTickets?: boolean
) =>
  PROGRAM_TRADES_COLUMNS.filter(
    column =>
      (hideSwaps ? column.name !== "swap" : true) &&
      (hideTickets ? column.name !== "ticket" : true)
  );

export const PROGRAM_TRADES_COLUMNS: SortingColumn[] = [
  {
    name: "direction-entry",
    sortingName: "ByDirection"
  },
  {
    name: "symbol",
    sortingName: "BySymbol"
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
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "commission",
    sortingName: "ByCommission"
  },
  {
    name: "swap",
    sortingName: "BySwap"
  },
  {
    name: "date",
    sortingName: "ByDate"
  },
  {
    name: "ticket",
    sortingName: "ByTicket"
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
    name: "number"
  },
  {
    name: "trades"
  },
  {
    name: "profit"
  },
  {
    name: "commission"
  },
  {
    name: "volume"
  },
  {
    name: "subscriptionDate"
  },
  {
    name: "unsubscriptionDate"
  },
  {
    name: "status"
  }
];

export const PROGRAM_FINANCIAL_STATISTIC_COLUMNS: SortingColumn[] = [
  {
    name: "period"
  },
  {
    name: "date-start"
  },
  {
    name: "balance"
  },
  {
    name: "profit"
  },
  {
    name: "success-fee"
  },
  {
    name: "entry-fee"
  },
  {
    name: "deposit-withdraw"
  }
];

export const PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS: SortingColumn[] = [
  {
    name: "period"
  },
  {
    name: "date-start"
  },
  {
    name: "balance"
  },
  {
    name: "profit"
  },
  {
    name: "success-fee"
  },
  {
    name: "entry-fee"
  },
  {
    name: "deposit-withdraw"
  },
  {
    name: "commission-rebate"
  }
];

export const PROGRAM_PERIOD_HISTORY: SortingColumn[] = [
  {
    name: "period"
  },
  {
    name: "date-start"
  },
  {
    name: "period-length"
  },
  {
    name: "balance"
  },
  {
    name: "profit"
  },
  {
    name: "investors"
  }
];

export const PROGRAM_TRADES_DEFAULT_FILTERS = [
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

export const GM_NAME = "Genesis Markets";
