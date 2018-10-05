import { ASSET_TYPE_FILTER_DEFAULT_VALUE } from "modules/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "modules/table/components/filtering/event-type-filter/event-type-filter.constants";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultAssetTypeFilter } from "modules/table/components/filtering/asset-type-filter/asset-type-filter.helpers";
import { composeDefaultEventTypeFilter } from "modules/table/components/filtering/event-type-filter/event-type-filter.helpers";
import { composeDefaultDateRangeFilter } from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const PORTFOLIO_EVENTS_COLUMNS = [
  {
    name: "date"
  },
  {
    name: "type"
  },
  {
    name: "description",
    value: "title"
  },
  {
    name: "amount",
    value: "value"
  }
];

export const PORTFOLIO_EVENTS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  },
  { ...composeDefaultAssetTypeFilter() },
  { ...composeDefaultEventTypeFilter() }
];

export const PORTFOLIO_EVENTS_DEFAULT_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  assetType: ASSET_TYPE_FILTER_DEFAULT_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

export const PORTFOLIO_EVENTS_TYPES_ENUM = {
  All: "all",
  Invest: "invest",
  Withdraw: "withdraw",
  Profit: "profit",
  Loss: "loss",
  Reinvest: "reinvest",
  Canceled: "canceled",
  Ended: "ended"
};
