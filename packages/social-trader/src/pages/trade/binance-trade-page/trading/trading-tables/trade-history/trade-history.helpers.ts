import { SortingColumn } from "components/table/components/filtering/filter.type";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import { isOrderDeleted } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";

export const updateTradeHistoryData = (
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
  return Object.values(normalizedData);
};

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
