import { SortingColumn } from "components/table/components/filtering/filter.type";
import { QueryOrderResult } from "pages/trades/binance-trade-page/trading/trading.types";
import { AnyObjectType } from "utils/types";

export const normalizeOpenOrdersList = (list: QueryOrderResult[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.orderId] = item));
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
