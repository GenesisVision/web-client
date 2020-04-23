import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import {
  ExchangeInfo,
  Symbol,
  Ticker
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

// export const BINANCE_HTTP_API = "https://www.binance.com/api";
export const BINANCE_HTTP_API = "/api";

export const getSymbols = (): Observable<Symbol[]> =>
  getExchangeInfo().pipe(map(({ symbols }: ExchangeInfo) => symbols));

export const getExchangeInfo = (): Observable<ExchangeInfo> =>
  requestService.get({
    url: "/api/v3/exchangeInfo"
  });

export const pingBinanceApi = (): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/ping"
  });

export const getOpenOrders = (
  symbol: string,
  authData: TradeAuthDataType
): Observable<any[]> =>
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
): Observable<any[]> =>
  requestService.get({
    ...authData,
    url: "/api/v3/account",
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getBinanceTrades = (symbol: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/trades",
    params: { symbol: symbol.toUpperCase(), limit: "20" }
  });

export const getTickers = (symbol?: string): Observable<Ticker[]> =>
  requestService.get({
    url: "/api/v3/ticker/24hr",
    params: symbol ? { symbol: symbol.toUpperCase() } : {}
  });

export const getDepth = (symbol?: string): Observable<any[]> =>
  requestService.get({
    url: "/api/v3/depth",
    params: { symbol: symbol ? symbol.toUpperCase() : "", limit: "5" }
  });

export const newOrder = (
  options: OrderRequest,
  authData: TradeAuthDataType
): Observable<any> =>
  requestService.post({
    ...authData,
    url: "/api/v3/order",
    params: options,
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const postBuy = (
  { symbol, price, quantity, type }: TradeRequest,
  authData: TradeAuthDataType
): Observable<any[]> =>
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

export const postSell = (
  { symbol, price, quantity, type }: TradeRequest,
  authData: TradeAuthDataType
): Observable<any[]> =>
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
