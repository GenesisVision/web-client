import { SortingColumn } from "components/table/components/filtering/filter.type";

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
    name: "amount"
  },
  {
    name: "average-price"
  },
  {
    name: "profit"
  }
];

