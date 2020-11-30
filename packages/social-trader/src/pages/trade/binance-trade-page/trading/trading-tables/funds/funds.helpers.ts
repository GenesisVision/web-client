import { SortingColumn } from "components/table/components/filtering/filter.type";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType } from "utils/types";

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
    name: "-value"
  }
];

export const FUTURES_FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  ...FUNDS_TABLE_COLUMNS,
  { name: "" }
];

export const normalizeFundsList = (
  list: AssetBalance[]
): { [key: string]: AssetBalance } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.asset] = item));
  return initObject;
};
