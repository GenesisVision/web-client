import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";

export const ASSETS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "asset",
    sortingName: "BySymbol",
    tooltip: true
  },
  {
    name: "name",
    sortingName: "ByAsset",
    tooltip: true
  },
  {
    name: "price-$",
    sortingName: "ByPrice",
    tooltip: true
  },
  {
    name: "change-24h",
    sortingName: "ByChange",
    tooltip: true
  },
  {
    name: "market-cap",
    sortingName: "ByMarketCap",
    tooltip: true
  },
  {
    name: "volume-24h",
    sortingName: "ByVolume",
    tooltip: true
  },
  {
    name: "chart"
  }
];

export const ASSETS_PORTFOLIO_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "asset",
    sortingName: "BySymbol",
    tooltip: true
  },
  {
    name: "name",
    sortingName: "ByAsset",
    tooltip: true
  },
  {
    name: "price-$",
    sortingName: "ByPrice",
    tooltip: true
  },
  {
    name: "change-24h",
    sortingName: "ByChange",
    tooltip: true
  },
  {
    name: "amount",
    tooltip: true
  },
  {
    name: "average-price",
    tooltip: true
  },
  {
    name: "profit",
    tooltip: true
  }
];

export const ASSETS_HISTORY_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "date",
    tooltip: true
  },
  {
    name: "trades",
    tooltip: true
  },
  {
    name: "price",
    tooltip: true
  },
  {
    name: "commission",
    tooltip: true
  }
];
