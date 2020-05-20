import {
  transformFuturesAccount,
  transformFuturesTickerSymbol
} from "pages/trades/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesTickerSymbol } from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import {
  Account,
  CancelOrderResult,
  ChangeLeverageResponse,
  Depth,
  ExchangeInfo,
  FuturesPositionInformation,
  HttpResponse,
  KlineParams,
  MarginModeType,
  OrderSide,
  QueryOrderResult,
  SymbolLeverageBrackets,
  Ticker,
  Trade,
  TradeAuthDataType,
  TradeRequest
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  OrderRequest,
  REQUEST_TYPE,
  requestService,
  TimeInForce
} from "services/request.service";

const dev = process.env.NODE_ENV !== "production";

const API_ROOT_ROUTE = "https://fapi.binance.com";
const API_PATH = "/fapi/v1";
const API_ROUTE = API_PATH;

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  requestService.get(
    {
      url: `${API_ROUTE}/exchangeInfo`
    },
    value => value
  );

export const pingBinanceApi = (): Observable<any[]> =>
  requestService.get({
    url: `${API_ROUTE}/ping`
  });

export const getPositionInformation = ({
  authData
}: {
  authData: TradeAuthDataType;
}): Observable<FuturesPositionInformation[]> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/positionRisk`,
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getKlines = (params: KlineParams): Promise<number[][]> => {
  return requestService.get(
    {
      url: "/fapi/v1/klines",
      params
    },
    value => value
  );
};

export const getLeverageBrackets = ({
  symbol,
  authData
}: {
  symbol: string;
  authData: TradeAuthDataType;
}): Promise<SymbolLeverageBrackets[]> =>
  requestService
    .get(
      {
        ...authData,
        url: `${API_ROUTE}/leverageBracket`,
        params: { symbol },
        type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
      },
      value => value
    )
    .then((data: SymbolLeverageBrackets[] | SymbolLeverageBrackets) =>
      Array.isArray(data) ? data : [data]
    );

export const changeLeverage = ({
  leverage,
  symbol,
  authData
}: {
  leverage: number;
  symbol: string;
  authData: TradeAuthDataType;
}): Promise<ChangeLeverageResponse> =>
  requestService.post(
    {
      ...authData,
      url: `${API_ROUTE}/leverage`,
      params: { symbol, leverage },
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const changeMarginMode = ({
  mode,
  symbol,
  authData
}: {
  mode: MarginModeType;
  symbol: string;
  authData: TradeAuthDataType;
}): Promise<HttpResponse> =>
  requestService.post(
    {
      ...authData,
      url: `${API_ROUTE}/marginType`,
      params: { symbol, marginType: mode },
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const getOpenOrders = (
  symbol: string,
  authData: TradeAuthDataType
): Observable<QueryOrderResult[]> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/openOrders`,
    params: { symbol: symbol },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getAllOrders = (
  symbol: string,
  authData: TradeAuthDataType
): Observable<QueryOrderResult[]> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/allOrders`,
    params: { symbol: symbol.toUpperCase() },
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

export const getUserStreamKey = (
  authData: TradeAuthDataType
): Observable<{ listenKey: string }> =>
  requestService.post({
    ...authData,
    url: `${API_ROUTE}/listenKey`,
    type: [REQUEST_TYPE.AUTHORIZED]
  });

export const getAccountInformation = (
  authData: TradeAuthDataType
): Observable<Account> =>
  requestService
    .get({
      ...authData,
      url: `${API_ROUTE}/account`,
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    })
    .pipe(map(transformFuturesAccount));

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<Trade[]> =>
  requestService.get({
    url: `${API_ROUTE}/trades`,
    params: { symbol: symbol.toUpperCase(), limit: String(limit) }
  });

export const getTickers = (symbol?: string): Observable<Ticker[]> =>
  requestService
    .get({
      url: `${API_ROUTE}/ticker/24hr`,
      params: symbol ? { symbol: symbol.toUpperCase() } : {}
    })
    .pipe(
      map((items: FuturesTickerSymbol[]) =>
        items.map(transformFuturesTickerSymbol)
      )
    );

export const getDepth = (
  symbol: string,
  limit: number = 1000
): Observable<Depth> =>
  requestService.get({
    url: `${API_ROUTE}/depth`,
    params: { symbol, limit: String(limit) }
  });

export const newOrder = (
  options: OrderRequest,
  authData: TradeAuthDataType
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
  authData: TradeAuthDataType
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
  authData: TradeAuthDataType
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
  stopPrice,
  authData,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & { authData: TradeAuthDataType }): Promise<QueryOrderResult> =>
  newOrder(
    {
      stopPrice: type === "STOP_LOSS_LIMIT" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        type === "LIMIT" || type === "STOP_LOSS_LIMIT"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce:
        type === "LIMIT" || type === "STOP_LOSS_LIMIT"
          ? TimeInForce.GTC
          : undefined,
      side: "BUY"
    },
    authData
  );

export const postSell = ({
  stopPrice,
  authData,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & { authData: TradeAuthDataType }): Promise<QueryOrderResult> =>
  newOrder(
    {
      stopPrice: type === "STOP_LOSS_LIMIT" ? String(stopPrice) : undefined,
      symbol,
      type,
      price:
        type === "LIMIT" || type === "STOP_LOSS_LIMIT"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce:
        type === "LIMIT" || type === "STOP_LOSS_LIMIT"
          ? TimeInForce.GTC
          : undefined,
      side: "SELL"
    },
    authData
  );

export const getTradeMethod = (side: OrderSide) =>
  side === "BUY" ? postBuy : postSell;

export const tradeRequest = ({
  side,
  ...options
}: TradeRequest & { authData: TradeAuthDataType; side: OrderSide }) => {
  const method = getTradeMethod(side);
  return method(options);
};
