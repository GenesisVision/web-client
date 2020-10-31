import dayjs from "dayjs";
import {
  BinanceRawCancelOrder,
  BinanceRawCancelOrderId,
  BinanceRawKline,
  BinanceRawKlineItemsViewModel,
  BinanceRawOrder,
  BinanceRawOrderBook,
  BinanceRawOrderBookEntry,
  BinanceRawOrderItemsViewModel,
  BinanceRawPlaceOrder,
  BinanceRawRecentTrade
} from "gv-api-web";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import {
  Account,
  CorrectedRestDepth,
  ExchangeInfo,
  KlineParams,
  OrderSide,
  QueryOrderResult,
  StringBidDepth,
  Ticker,
  TradeRequest,
  UnitedOrder,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { from, Observable } from "rxjs";
import { api } from "services/api-client/swagger-custom-client";
import { OrderRequest } from "services/request.service";

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  api.terminal().getExchangeInfo();

const transformKlineBar = ({
  close,
  high,
  low,
  open,
  openTime,
  baseVolume
}: BinanceRawKline): Bar => ({
  close,
  high,
  low,
  open,
  time: dayjs(openTime).unix() * 1000,
  volume: baseVolume
});

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

const transformToUnitedOrder = ({
  orderId,
  createTime,
  symbol,
  type,
  side,
  price,
  quantity,
  quoteQuantity,
  quantityFilled
}: BinanceRawOrder): UnitedOrder => ({
  executedQuantity: quoteQuantity,
  id: orderId,
  time: createTime,
  symbol,
  type,
  side,
  price,
  quantityFilled,
  quantity
});

export const getOpenOrders = (
  symbol: string,
  accountId?: string
): Observable<UnitedOrder[]> =>
  from(
    api
      .terminal()
      .getOpenOrders({ accountId })
      .then(({ items }: BinanceRawOrderItemsViewModel) =>
        items.map(transformToUnitedOrder)
      ) as Promise<UnitedOrder[]>
  );

export const getAllOrders = (
  symbol: string,
  accountId?: string
): Observable<UnitedOrder[]> =>
  from(
    api
      .terminal()
      .getTradesHistory({ accountId })
      .then(({ items }: BinanceRawOrderItemsViewModel) =>
        items.map(transformToUnitedOrder)
      ) as Promise<UnitedOrder[]>
  );

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
  accountId?: string
): Observable<Account> =>
  from(api.terminal().getAccountInfo({ accountId }) as Promise<Account>);

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<UnitedTrade[]> =>
  from(
    api
      .terminal()
      .getSymbolRecentTrades(symbol, { limit })
      .then((items: Array<BinanceRawRecentTrade>) =>
        items.map(({ orderId, price, baseQuantity, tradeTime }) => ({
          quantity: baseQuantity,
          price,
          orderId,
          tradeTime
        }))
      ) as Promise<UnitedTrade[]>
  );

export const getTickers = (symbol: string = ""): Observable<Ticker[]> =>
  from(api.terminal().get24HPrices(symbol) as Promise<Ticker[]>);

const transformDepthToString = ({
  price,
  quantity
}: BinanceRawOrderBookEntry): StringBidDepth => [
  String(price),
  String(quantity)
];

export const getDepth = (
  symbol: string,
  limit: number = 1000
): Observable<CorrectedRestDepth> =>
  from(
    api
      .terminal()
      .getOrderBook(symbol, { limit })
      .then((data: BinanceRawOrderBook) => ({
        ...data,
        asks: data.asks.map(transformDepthToString),
        bids: data.bids.map(transformDepthToString)
      })) as Promise<CorrectedRestDepth>
  );

export const newOrder = (
  options: OrderRequest,
  accountId?: string
): Promise<any> =>
  api.terminal().placeOrder({
    body: {
      ...options,
      price: +options.price!,
      quantity: +options.quantity!
    } as BinanceRawPlaceOrder,
    accountId
  });

export const cancelAllOrders = (
  { symbol }: { symbol: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrderId[]> =>
  api.terminal().cancelAllOrders({ symbol, accountId });

export const cancelOrder = (
  {
    symbol,
    orderId
  }: { orderId: string; symbol: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrder> =>
  api.terminal().cancelOrder({ orderId, symbol, accountId });

export const postBuy = ({
  reduceOnly,
  timeInForce,
  stopPrice,
  accountId,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & {
  accountId?: string;
}): Promise<QueryOrderResult> =>
  newOrder(
    {
      reduceOnly,
      stopPrice: type === "StopLossLimit" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        type === "Limit" || type === "StopLossLimit"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce,
      side: "Buy"
    },
    accountId
  );

export const postSell = ({
  reduceOnly,
  timeInForce,
  stopPrice,
  accountId,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & {
  accountId?: string;
}): Promise<QueryOrderResult> =>
  newOrder(
    {
      reduceOnly,
      stopPrice: type === "StopLossLimit" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        type === "Limit" || type === "StopLossLimit"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce,
      side: "Sell"
    },
    accountId
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
