import { TableDataType } from "constants/constants";
import {
  BinanceRawAggregatedTrade,
  BinanceRawCancelOrder,
  BinanceRawCancelOrderId,
  BinanceRawKlineItemsViewModel,
  BinanceRawOrderBook,
  BinanceRawOrderItemsViewModel,
  BinanceRawRecentTrade,
  TradingPlatformBinanceOrdersMode
} from "gv-api-web";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { getDividerParts } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import { DEFAULT_TICKSIZE } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  CorrectedRestDepth,
  ExchangeInfo,
  KlineParams,
  OrderSide,
  SpotOrder,
  Ticker,
  TradeRequest,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { from, Observable } from "rxjs";
import { api } from "services/api-client/swagger-custom-client";
import { CurrencyEnum } from "utils/types";

import {
  createSpotPlaceBuySellOrderRequest,
  PlaceOrderRequest,
  transformDepthToString,
  transformKlineBar,
  transformToUnitedOrder
} from "../../api.helpers";

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  api.terminal().getExchangeInfo();

export const getKlines = async (params: KlineParams): Promise<Bar[]> => {
  let bars: Bar[] = [];
  const sendRequest = async (startTime: number) => {
    const data = await api
      .terminal()
      .getKlines(params.symbol, {
        ...params,
        endTime: new Date(params.endTime),
        startTime: new Date(startTime)
      })
      .then(({ items }: BinanceRawKlineItemsViewModel) =>
        items.map(transformKlineBar)
      );
    bars.push.apply(bars, data);
    const length = bars.length;

    if (length === 1000) {
      const lastBar = bars[bars.length - 1];
      const nextTime = lastBar.time + 1;
      await sendRequest(nextTime);
    }
  };

  await sendRequest(params.startTime);

  return bars;
};

export const getServerTime = () => {
  return api.terminal().getExchangeTime();
};

export const getOpenOrders = (accountId: string): Observable<SpotOrder[]> =>
  from(
    api
      .terminal()
      .getOpenOrders({ accountId })
      .then(({ items }: BinanceRawOrderItemsViewModel) =>
        items.map(transformToUnitedOrder)
      ) as Promise<SpotOrder[]>
  );

export const getAllTrades = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<SpotOrder>> =>
  api
    .terminal()
    .getTradesHistory({ ...filters, mode: "TradeHistory" })
    .then(({ total, items }: BinanceRawOrderItemsViewModel) => ({
      total,
      items: items.map(transformToUnitedOrder)
    }));

export const getAllOrders = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<SpotOrder>> =>
  api
    .terminal()
    .getTradesHistory({ ...filters, mode: "OrderHistory" })
    .then(({ total, items }: BinanceRawOrderItemsViewModel) => ({
      total,
      items: items.map(transformToUnitedOrder)
    }));

export const getUserStreamKey = (
  accountId?: string
): Observable<{ listenKey: string }> =>
  from(
    api
      .terminal()
      .startAccountStream({ accountId })
      .then((listenKey: string) => ({ listenKey })) as Promise<{
      listenKey: string;
    }>
  );

export const getAccountInformation = (
  accountId?: string,
  currency?: CurrencyEnum
) => api.terminal().getAccountInfo({ accountId, currency });

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<UnitedTrade[]> =>
  from(
    api
      .terminal()
      .getSymbolAggregatedTrades(symbol, { limit })
      .then((items: Array<BinanceRawAggregatedTrade>) =>
        items.map(
          ({ price, tradeTime, buyerIsMaker, aggregateTradeId, quantity }) => ({
            quantity,
            price,
            orderId: aggregateTradeId,
            tradeTime,
            buyerIsMaker
          })
        )
      ) as Promise<UnitedTrade[]>
  );

export const getTickers = (symbol: string = ""): Observable<Ticker[]> =>
  from(api.terminal().get24HPrices(symbol) as Promise<Ticker[]>);

export const getDepth = (
  symbol: string,
  tickSize: string = "0.00000001",
  limit: number = 100
): Observable<CorrectedRestDepth> => {
  const dividerParts = getDividerParts(DEFAULT_TICKSIZE);

  return from(
    api
      .terminal()
      .getOrderBook(symbol, { limit })
      .then((data: BinanceRawOrderBook) => ({
        ...data,
        asks: data.asks.map(transformDepthToString(dividerParts)),
        bids: data.bids.map(transformDepthToString(dividerParts))
      })) as Promise<CorrectedRestDepth>
  );
};

export const cancelAllOrders = (
  { symbol }: { symbol?: string; useServerTime?: boolean },
  accountId: string
): Promise<BinanceRawCancelOrderId[]> =>
  api.terminal().cancelAllOrders({ symbol, accountId });

export const cancelOrder = (
  {
    symbol,
    orderId
  }: { orderId?: string; symbol: string; useServerTime?: boolean },
  accountId: string
): Promise<BinanceRawCancelOrder> =>
  api.terminal().cancelOrder({ orderId, symbol, accountId });

const { postSell, postBuy } = createSpotPlaceBuySellOrderRequest(
  (api.terminal().placeOrder as unknown) as PlaceOrderRequest
);

export const getTradeMethod = (side: OrderSide) =>
  side === "Buy" ? postBuy : postSell;

export const tradeRequest = ({
  side,
  ...options
}: TradeRequest & { accountId?: string; side: OrderSide }) => {
  const method = getTradeMethod(side);
  return method(options);
};
