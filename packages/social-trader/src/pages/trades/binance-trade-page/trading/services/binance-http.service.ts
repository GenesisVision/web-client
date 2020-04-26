import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import {
  Account,
  CancelOrderResult,
  Depth,
  ExchangeInfo,
  OrderSide,
  QueryOrderResult,
  Ticker,
  Trade
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import {
  OrderRequest,
  REQUEST_TYPE,
  requestService,
  TimeInForce
} from "services/request.service";
import { formatValue } from "utils/formatter";

export interface TradeRequest {
  symbol: string;
  price: number;
  quantity: number;
  type: string;
}

// export const BINANCE_HTTP_API = "https://www.binance.com/api";
export const BINANCE_HTTP_API = "/api";

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  requestService.get(
    {
      url: "/api/v3/exchangeInfo"
    },
    value => value
  );

export const pingBinanceApi = (): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/ping"
  });

export const getOpenOrders = (
  symbol: string,
  authData: TradeAuthDataType
): Observable<QueryOrderResult[]> =>
  requestService.get({
    ...authData,
    url: "/api/v3/openOrders",
    params: { symbol: symbol },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getAllOrders = (
  symbol: string,
  authData: TradeAuthDataType
): Observable<any[]> =>
  requestService.get({
    ...authData,
    url: "/api/v3/allOrders",
    params: { symbol: symbol.toUpperCase() },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getUserStreamKey = (
  authData: TradeAuthDataType
): Observable<any[]> =>
  requestService.post({
    ...authData,
    url: "/api/v3/userDataStream",
    type: [REQUEST_TYPE.AUTHORIZED]
  });

export const getAccountInformation = (
  authData: TradeAuthDataType
): Observable<Account> =>
  requestService.get({
    ...authData,
    url: "/api/v3/account",
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getBinanceTrades = (
  symbol: string,
  limit: number = 50
): Observable<Trade[]> =>
  requestService.get({
    url: "/api/v3/trades",
    params: { symbol: symbol.toUpperCase(), limit: String(limit) }
  });

export const getTickers = (symbol?: string): Observable<Ticker[]> =>
  requestService.get({
    url: "/api/v3/ticker/24hr",
    params: symbol ? { symbol: symbol.toUpperCase() } : {}
  });

export const getDepth = (
  symbol: string,
  limit: number = 1000
): Observable<Depth> =>
  requestService.get({
    url: "/api/v3/depth",
    params: { symbol, limit: String(limit) }
  });

export const newOrder = (
  options: OrderRequest,
  authData: TradeAuthDataType
): Promise<any> =>
  requestService.post(
    {
      ...authData,
      url: "/api/v3/order",
      params: options,
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const cancelOrder = (
  options: { symbol: string; orderId: string; useServerTime?: boolean },
  authData: TradeAuthDataType
): Observable<CancelOrderResult> =>
  requestService.deleteRequest({
    ...authData,
    url: "/api/v3/order",
    params: options,
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const postBuy = ({
  authData,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & { authData: TradeAuthDataType }): Promise<any> =>
  newOrder(
    {
      symbol,
      type,
      price: String(price),
      quantity: formatValue(quantity, 3),
      timeInForce: TimeInForce.GTC,
      side: "BUY"
    },
    authData
  );

export const postSell = ({
  authData,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & { authData: TradeAuthDataType }): Promise<any> =>
  newOrder(
    {
      symbol,
      type,
      price: String(price),
      quantity: formatValue(quantity, 3),
      timeInForce: TimeInForce.GTC,
      side: "SELL"
    },
    authData
  );

export const getTradeMethod = (side: OrderSide) =>
  side === "BUY" ? postBuy : postSell;
