import { SortingColumn } from "components/table/components/filtering/filter.type";

export const TRADE_HISTORY_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "pair"
  },
  {
    name: "side"
  },
  {
    name: "price"
  },
  {
    name: "executed"
  },
  {
    name: "fee"
  },
  {
    name: "total"
  }
];
