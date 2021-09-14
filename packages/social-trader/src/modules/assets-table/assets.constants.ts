import { SortingColumn } from "components/table/components/filtering/filter.type";

export const ASSETS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "assets",
    sortingName: "ByAssets",
    tooltip: true
  },
  {
    name: "symbol",
    sortingName: "BySymbol",
    tooltip: true
  },
  {
    name: "price-$",
    tooltip: true
  },
  {
    name: "change-24h",
    tooltip: true
  },
  {
    name: "market-cap",
    tooltip: true
  },
  {
    name: "volume-24h",
    tooltip: true
  },
  {
    name: "chart"
  }
];

