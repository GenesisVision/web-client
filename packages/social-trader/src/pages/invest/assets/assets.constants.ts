import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FUND_ASSET_DEFAULT_VALUE } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";

export const ASSETS_COINS = "ASSETS_COINS";
export const ASSETS_PORTFOLIO = "ASSETS_PORTFOLIO";
export const ASSETS_HISTORY = "ASSETS_HISTORY";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export const ASSETS_HISTORY_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const ASSETS_HISTORY_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  assets: FUND_ASSET_DEFAULT_VALUE
};
