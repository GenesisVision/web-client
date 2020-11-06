import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { transformKlineWrapper } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Account,
  CancelOrderResult,
  ExchangeInfo,
  KlineParams,
  OrderSide,
  QueryOrderResult,
  RestDepth,
  TerminalAuthDataType,
  Ticker,
  TradeRequest,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { Observable } from "rxjs";
import {
  OrderRequest,
  REQUEST_TYPE,
  requestService
} from "services/request.service";

const dev = process.env.NODE_ENV !== "production";

const API_ROOT_ROUTE = "https://api.binance.com";
const API_PATH = "/api/v3";
const API_ROUTE = API_PATH;

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  requestService.get(
    {
      url: `${API_ROUTE}/exchangeInfo`
    },
    value => value
  );

export const getKlines = async (params: KlineParams): Promise<Bar[]> => {
  const bars: Bar[] = [];

  const sendRequest = async (startTime: number) => {
    const data = await requestService.get(
      {
        url: `${API_ROUTE}/klines`,
        params: {
          ...params,
          startTime
        }
      },
      transformKlineWrapper
    );

    bars.push.apply(bars, data);
    const length = bars.length;

    if (length === 1000) {
      const lastBar = bars[bars.length - 1];
      const nextTime = lastBar.time + 1;
      await sendRequest(nextTime);
    }
  };

  // @ts-ignore
  await sendRequest(params.startTime);
  return bars;
};

export const getServerTime = (): Promise<{ serverTime: number }> => {
  return requestService.get(
    {
      url: `${API_ROUTE}/time`
    },
    value => value
  );
};

export const pingBinanceApi = (): Observable<any[]> =>
  requestService.get({
    url: `${API_ROUTE}/ping`
  });

export const getOpenOrders = (
  symbol: string,
  authData: TerminalAuthDataType
): Observable<QueryOrderResult[]> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/openOrders`,
    params: { symbol: symbol },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getAllOrders = (
  symbol: string,
  authData: TerminalAuthDataType
): Observable<QueryOrderResult[]> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/allOrders`,
    params: { symbol: symbol.toUpperCase() },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getUserStreamKey = (
  authData: TerminalAuthDataType
): Observable<{ listenKey: string }> =>
  requestService.post({
    ...authData,
    url: `${API_ROUTE}/userDataStream`,
    type: [REQUEST_TYPE.AUTHORIZED]
  });

export const getAccountInformation = (
  authData: TerminalAuthDataType
): Observable<Account> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/account`,
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<UnitedTrade[]> =>
  requestService.get({
    url: `${API_ROUTE}/trades`,
    params: { symbol: symbol.toUpperCase(), limit: String(limit) }
  });

export const getTickers = (symbol?: string): Observable<Ticker[]> =>
  requestService.get({
    url: `${API_ROUTE}/ticker/24hr`,
    params: symbol ? { symbol: symbol.toUpperCase() } : {}
  });

export const getDepth = (
  symbol: string,
  limit: number = 1000
): Observable<RestDepth> =>
  requestService.get({
    url: `${API_ROUTE}/depth`,
    params: { symbol, limit: String(limit) }
  });

export const newOrder = (
  options: OrderRequest,
  authData: TerminalAuthDataType
): Promise<any> =>
  requestService.post(
    {
      ...authData,
      url: `${API_ROUTE}/order`,
      params: options,
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const cancelAllOrders = (
  options: { symbol: string; useServerTime?: boolean },
  authData: TerminalAuthDataType
): Promise<CancelOrderResult> =>
  requestService.deleteRequest(
    {
      ...authData,
      url: `${API_ROUTE}/openOrders`,
      params: options,
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const cancelOrder = (
  options: { symbol: string; orderId: string; useServerTime?: boolean },
  authData: TerminalAuthDataType
): Promise<CancelOrderResult> =>
  requestService.deleteRequest(
    {
      ...authData,
      url: `${API_ROUTE}/order`,
      params: options,
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const postBuy = ({
  reduceOnly,
  timeInForce,
  stopPrice,
  authData,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & {
  authData: TerminalAuthDataType;
}): Promise<QueryOrderResult> =>
  newOrder(
    {
      reduceOnly,
      // @ts-ignore
      stopPrice: type === "StopLossLimit" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        // @ts-ignore
        type === "Limit" || type === "StopLossLimit"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce,
      // @ts-ignore
      side: "Buy"
    },
    authData
  );

export const postSell = ({
  reduceOnly,
  timeInForce,
  stopPrice,
  authData,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & {
  authData: TerminalAuthDataType;
}): Promise<QueryOrderResult> =>
  newOrder(
    {
      reduceOnly,
      // @ts-ignore
      stopPrice: type === "StopLossLimit" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        // @ts-ignore
        type === "Limit" || type === "StopLossLimit"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce,
      // @ts-ignore
      side: "Sell"
    },
    authData
  );

export const getTradeMethod = (side: OrderSide) =>
  // @ts-ignore
  side === "Buy" ? postBuy : postSell;

export const tradeRequest = ({
  side,
  ...options
}: TradeRequest & { authData: TerminalAuthDataType; side: OrderSide }) => {
  const method = getTradeMethod(side);
  return method(options);
};
