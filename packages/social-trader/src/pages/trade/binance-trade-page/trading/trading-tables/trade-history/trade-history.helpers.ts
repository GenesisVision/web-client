import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceExecutionType, BinanceOrderStatus } from "gv-api-web";
import {
  FuturesOrder,
  SpotOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import { isOrderDeleted } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import { AnyObjectType } from "utils/types";

export const updateSpotTradeHistoryData = (
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

export const updateFuturesTradeHistoryData = (
  data: FuturesOrder[],
  updates: FuturesOrder[]
): FuturesOrder[] => {
  let normalizedData = normalizeFuturesTradesList(data);
  updates.forEach(update => {
    if (isFuturesTradeOrder(update.orderStatus, update.executionType)) {
      normalizedData[update.tradeId] = {
        ...normalizedData[update.tradeId],
        ...update
      };
    }
  });
  return Object.values(normalizedData).sort(
    (a, b) => +new Date(b.time) - +new Date(a.time)
  );
};

const isFuturesTradeOrder = (
  orderStatus?: BinanceOrderStatus,
  executionType?: BinanceExecutionType
): boolean => {
  switch (orderStatus?.toLowerCase()) {
    case "new":
    case "expired":
    case "canceled":
      return false;
  }
  switch (executionType?.toLowerCase()) {
    case "new":
    case "canceled":
    case "expired":
      return false;
  }
  return true;
};

const normalizeFuturesTradesList = (list: SpotOrder[] | FuturesOrder[]) => {
  const initObject: AnyObjectType = {};
  list.forEach((item: any) => (initObject[item.tradeId] = item));
  return initObject;
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
