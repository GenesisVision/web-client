import { SortingColumn } from "components/table/components/filtering/filter.type";
import { SpotOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import { isOrderDeleted } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";

export const updateTradeHistoryData = (
  data: SpotOrder[],
  updates: SpotOrder[]
): SpotOrder[] => {
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

export const TRADE_HISTORY_SPOT_TABLE_COLUMNS: SortingColumn[] = [
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

export const TRADE_HISTORY_FUTURES_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "time"
  },
  {
    name: "symbol"
  },
  {
    name: "side"
  },
  {
    name: "price"
  },
  {
    name: "quantity"
  },
  {
    name: "fee"
  },
  {
    name: "realized-profit"
  }
];
