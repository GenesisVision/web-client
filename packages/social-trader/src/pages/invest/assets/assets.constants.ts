import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FUND_ASSET_DEFAULT_VALUE,
  FUND_ASSET_FILTER_NAME
} from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import { fundAssetFilter } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.helpers";

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
  },
  fundAssetFilter
];

export const ASSETS_HISTORY_FILTERS = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [FUND_ASSET_FILTER_NAME]: FUND_ASSET_DEFAULT_VALUE
};
