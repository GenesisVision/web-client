import dayjs from "dayjs";
import {
  BinanceRawCancelOrder,
  BinanceRawCancelOrderId,
  BinanceRawKline,
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
import { CurrencyEnum } from "utils/types";

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

export const getServerTime = () => {
  return api.terminal().getExchangeTime();
};

const transformToUnitedOrder = ({
  commission,
  quoteQuantityFilled,
  orderId,
  createTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  quantity,
  quoteQuantity,
  quantityFilled
}: BinanceRawOrder): UnitedOrder => ({
  commission,
  quoteQuantityFilled,
  executedQuantity: quoteQuantity,
  id: orderId,
  time: createTime,
  symbol,
  type,
  side,
  stopPrice,
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

export const getAllTrades = (accountId?: string): Observable<UnitedOrder[]> =>
  from(
    api
      .terminal()
      .getTradesHistory({ accountId, mode: "TradeHistory" })
      .then(({ items }: BinanceRawOrderItemsViewModel) =>
        items.map(transformToUnitedOrder)
      ) as Promise<UnitedOrder[]>
  );

export const getAllOrders = (accountId?: string): Observable<UnitedOrder[]> =>
  from(
    api
      .terminal()
      .getTradesHistory({ accountId, mode: "OrderHistory" })
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
  accountId?: string,
  currency?: CurrencyEnum
): Observable<Account> =>
  from(
    api.terminal().getAccountInfo({ accountId, currency }) as Promise<Account>
  );

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
      stopPrice: type === "TakeProfitLimit" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        type === "Limit" || type === "TakeProfitLimit"
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
      stopPrice: type === "TakeProfitLimit" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        type === "Limit" || type === "TakeProfitLimit"
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
