import { Observable } from "rxjs";
import { formatValue } from "utils/formatter";

import {
  OrderRequest,
  REQUEST_TYPE,
  requestService,
  TimeInForce
} from "../request.service";

export interface TradeRequest {
  symbol: string;
  price: number;
  quantity: number;
  type: string;
}

export const BINANCE_HTTP_API = "https://www.binance.com/api/v1/";

export const getOpenOrders = (symbol?: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/openOrders",
    params: { symbol: symbol },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getAllOrders = (symbol: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/allOrders",
    params: { symbol: symbol.toUpperCase() },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getUserStreamKey = (): Observable<any[]> =>
  requestService.post({
    url: "/api/v1/userDataStream",
    type: [REQUEST_TYPE.AUTHORIZED]
  });

export const getAccountInformation = (): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/account",
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getTrades = (symbol: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v1/trades",
    params: { symbol: symbol.toUpperCase(), limit: "20" }
  });

export const getTickers = (symbol?: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v1/ticker/24hr",
    params: symbol ? { symbol: symbol.toUpperCase() } : {}
  });

export const getDepth = (symbol?: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v1/depth",
    params: { symbol: symbol ? symbol.toUpperCase() : "", limit: "5" }
  });

export const newOrder = (options: OrderRequest): Observable<any> =>
  requestService.post({
    url: "/api/v3/order",
    params: options,
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const postBuy = ({
  symbol,
  price,
  quantity,
  type
}: TradeRequest): Observable<any[]> =>
  newOrder({
    symbol,
    type,
    price: String(price),
    quantity: formatValue(quantity, 3),
    timeInForce: TimeInForce.GTC,
    side: "BUY"
  });

export const postSell = ({
  symbol,
  price,
  quantity,
  type
}: TradeRequest): Observable<any[]> =>
  newOrder({
    symbol,
    type,
    price: String(price),
    quantity: formatValue(quantity, 3),
    timeInForce: TimeInForce.GTC,
    side: "SELL"
  });
