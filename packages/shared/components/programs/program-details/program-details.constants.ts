import {
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  IDataRangeFilterValue
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  IDefaultFilter,
  IDefaultFilters,
  SortingColumn
} from "shared/components/table/components/filtering/filter.type";
import { DATE_RANGE_FILTER_NAME } from "shared/modules/programs-table/components/programs-table/programs.constants";

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";
export const PROGRAM_TRADES_SORTING = "ByDateDesc";
export const PROGRAM_TRADES_COLUMNS: SortingColumn[] = [
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

export const PROGRAM_TRADES_DEFAULT_FILTERS: IDefaultFilters<
  PROGRAM_TRADES_FILTERS_TYPE
> = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export type PROGRAM_TRADES_FILTERS_TYPE = {
  [DATE_RANGE_FILTER_NAME]: IDataRangeFilterValue;
};

export const PROGRAM_TRADES_FILTERS: PROGRAM_TRADES_FILTERS_TYPE = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};
