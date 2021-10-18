import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceExecutionType, BinanceOrderStatus } from "gv-api-web";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";

export const updateOrderHistoryData = (
  data: UnitedOrder[],
  updates: UnitedOrder[]
): UnitedOrder[] => {
  const normalizedData = normalizeOpenOrdersList(data);
  updates.forEach(update => {
    if (isOrderDeleted(update.orderStatus, update.executionType))
      delete normalizedData[update!.id];
    else
      normalizedData[update.id] = {
        ...normalizedData[update.id],
        ...update
      };
  });
  return Object.values(normalizedData).sort(
    (a, b) => +new Date(b.time) - +new Date(a.time)
  );
};

export const isOrderDeleted = (
  orderStatus?: BinanceOrderStatus,
  executionType?: BinanceExecutionType
): boolean => {
  switch (orderStatus?.toLowerCase()) {
    case "expired":
    case "canceled":
      return true;
  }
  switch (executionType?.toLowerCase()) {
    case "canceled":
    case "expired":
      return true;
  }
  return false;
};

export const ORDER_HISTORY_TABLE_COLUMNS: SortingColumn[] = [
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
    name: "executed"
  },
  {
    name: "amount"
  },
  {
    name: "total"
  },
  {
    name: "trigger conditions"
  },
  {
    name: "status"
  }
];

export const ORDER_HISTORY_FUTURES_TABLE_COLUMNS: SortingColumn[] = [
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
    name: "average"
  },
  {
    name: "price"
  },
  {
    name: "executed"
  },
  {
    name: "amount"
  },
  {
    name: "reduce-only"
  },
  {
    name: "trigger-conditions"
  },
  {
    name: "status"
  }
];
