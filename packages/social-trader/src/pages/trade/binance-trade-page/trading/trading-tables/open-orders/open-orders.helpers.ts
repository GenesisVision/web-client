import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  FuturesOrder,
  SpotOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType } from "utils/types";

export const normalizeOpenOrdersList = (list: SpotOrder[] | FuturesOrder[]) => {
  const initObject: AnyObjectType = {};
  list.forEach((item: any) => (initObject[item.orderId] = item));
  return initObject;
};

export const OPEN_ORDERS_SPOT_TABLE_COLUMNS: SortingColumn[] = [
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
    name: "trigger-conditions"
  },
  {
    name: "cancel-all"
  }
];

export const OPEN_ORDERS_FUTURES_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "time"
  },
  {
    name: "symbol"
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
    name: "reduce-only"
  },
  {
    name: "trigger-conditions"
  },
  {
    name: "action"
  }
];
