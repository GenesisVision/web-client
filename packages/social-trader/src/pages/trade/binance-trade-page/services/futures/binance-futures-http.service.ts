import {
  transformAccountToBalanceForTransfer,
  transformFuturesAccount,
  transformFuturesTickerSymbol
} from "pages/trade/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesTickerSymbol } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { transformKlineWrapper } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Account,
  BalancesForTransfer,
  CancelOrderResult,
  ChangeLeverageResponse,
  ExchangeInfo,
  FuturesPositionInformation,
  HttpResponse,
  KlineParams,
  MarginModeType,
  MarkPrice,
  OrderSide,
  PositionModeResponse,
  PositionModeType,
  QueryOrderResult,
  RestDepth,
  SymbolLeverageBrackets,
  TerminalAuthDataType,
  TerminalCurrency,
  Ticker,
  TradeRequest,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  OrderRequest,
  REQUEST_TYPE,
  requestService
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

export const getServerTime = (): Promise<{ serverTime: number }> => {
  return requestService.get(
    {
      url: `${API_ROUTE}/time`
    },
    value => value
  );
};

export const getMarkPrice = (params: {
  symbol: string;
}): Observable<MarkPrice> =>
  requestService.get({
    params,
    url: `${API_ROUTE}/premiumIndex`
  });

export const getBalancesForTransfer = ({
  authData
}: {
  authData: TerminalAuthDataType;
}): Promise<BalancesForTransfer> => {
  const futuresAccountRequest = requestService
    .get(
      {
        ...authData,
        url: `${API_ROUTE}/account`,
        type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
      },
      value => value
    )
    .then(transformFuturesAccount)
    .then(transformAccountToBalanceForTransfer);
  const spotAccountRequest = requestService
    .get(
      {
        ...authData,
        url: "/api/v3/account",
        type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
      },
      value => value
    )
    .then(transformAccountToBalanceForTransfer);
  return Promise.all([
    futuresAccountRequest,
    spotAccountRequest
  ]).then(([futures, spot]) => ({ futures, spot }));
};

export const newFutureAccountTransfer = ({
  asset,
  amount,
  type,
  authData
}: {
  asset: TerminalCurrency;
  amount: number;
  type: number; // 1 | 2
  authData: TerminalAuthDataType;
}): Promise<HttpResponse> =>
  requestService.post(
    {
      ...authData,
      url: "/sapi/v1/futures/transfer",
      params: {
        asset,
        amount,
        type
      },
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const changePositionMode = ({
  dualSidePosition,
  authData
}: {
  dualSidePosition: PositionModeType;
  authData: TerminalAuthDataType;
}): Promise<HttpResponse> =>
  requestService.post(
    {
      ...authData,
      url: `${API_ROUTE}/positionSide/dual`,
      params: { dualSidePosition },
      type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
    },
    value => value
  );

export const getPositionMode = ({
  authData
}: {
  authData: TerminalAuthDataType;
}): Promise<PositionModeType> =>
  requestService
    .get(
      {
        ...authData,
        url: `${API_ROUTE}/positionSide/dual`,
        type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
      },
      value => value
    )
    .then(({ dualSidePosition }: PositionModeResponse) => dualSidePosition);

export const getPositionInformation = ({
  authData
}: {
  authData: TerminalAuthDataType;
}): Observable<FuturesPositionInformation[]> =>
  requestService.get({
    ...authData,
    url: `${API_ROUTE}/positionRisk`,
    type: [REQUEST_TYPE.SIGNED, REQUEST_TYPE.AUTHORIZED]
  });

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

export const getLeverageBrackets = ({
  symbol,
  authData
}: {
  symbol: string;
  authData: TerminalAuthDataType;
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
  authData: TerminalAuthDataType;
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
  authData: TerminalAuthDataType;
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
    url: `${API_ROUTE}/listenKey`,
    type: [REQUEST_TYPE.AUTHORIZED]
  });

export const getAccountInformation = (
  authData: TerminalAuthDataType
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
): Observable<UnitedTrade[]> =>
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
  limit?: string
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
      stopPrice: type === "StopLossLimit" ? stopPrice : undefined,
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
      stopPrice: type === "StopLossLimit" ? stopPrice : undefined,
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
