import { SortingColumn } from "components/table/components/filtering/filter.type";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType } from "utils/types";

export const normalizeOpenOrdersList = (list: UnitedOrder[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.id] = item));
  return initObject;
};

export const OPEN_ORDERS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "pair"
  },
  {
    name: "type"
  },
  {
    name: "side"
  },
  {
    name: "price"
  },
  {
    name: "amount"
  },
  {
    name: "filled"
  },
  {
    name: "total"
  },
  {
    name: "cancel-all"
  }
];
