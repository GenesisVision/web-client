import { SortingColumn } from "components/table/components/filtering/filter.type";

export const FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "coin"
  },
  {
    name: "total"
  },
  {
    name: "available"
  },
  {
    name: "in-order"
  },
  {
    name: "btc-value"
  }
];

export const FUTURES_FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  ...FUNDS_TABLE_COLUMNS,
  { name: "" }
];
