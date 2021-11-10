import { TableDataType } from "constants/constants";
import {
  BinanceFuturesMarginChangeDirectionType,
  BinanceFuturesMarginType,
  BinancePositionMode,
  BinancePositionSide,
  BinanceRawCancelOrder,
  BinanceRawCancelOrderId,
  BinanceRawFuturesChangeMarginTypeResult,
  BinanceRawFuturesIncomeHistory,
  BinanceRawFuturesOrderItemsViewModel,
  BinanceRawFuturesPositionMarginResult,
  BinanceRawFuturesPositionMode,
  BinanceRawKlineItemsViewModel,
  BinanceRawOrderBook,
  BinanceRawOrderItemsViewModel,
  BinanceRawRecentTrade,
  TradingPlatformBinanceOrdersMode
} from "gv-api-web";
import {
  mapBinanceRawFuturesAccountInfoToAccount,
  mapBinanceRawFuturesSymbolBracketToSymbolLeverageBrackets
} from "pages/trade/binance-trade-page/services/gv/futures/gv-futures-helpers";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { getDividerParts } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import {
  ChangeLeverageResponse,
  CorrectedRestDepth,
  ExchangeInfo,
  FuturesOrder,
  KlineParams,
  MarkPrice,
  OrderSide,
  Position,
  PositionModeType,
  SymbolLeverageBrackets,
  Ticker,
  TradeRequest,
  TransactionHistory,
  UnitedOrder,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { from, Observable } from "rxjs";
import { api } from "services/api-client/swagger-custom-client";

import {
  createFuturesPlaceBuySellOrderRequest,
  PlaceOrderRequest,
  transformDepthToString,
  transformFuturesOrder,
  transformKlineBar,
  transformToUnitedOrder
} from "../../api.helpers";

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  (api.terminal().getFuturesExchangeInfo() as unknown) as Promise<ExchangeInfo>;

export const getKlines = async (params: KlineParams): Promise<Bar[]> => {
  let bars: Bar[] = [];
  const sendRequest = async (startTime: number) => {
    const data = await api
      .terminal()
      .getFuturesKlines({
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

export const getOpenOrders = (
  symbol: string,
  accountId?: string
): Observable<FuturesOrder[]> =>
  from(
    api
      .terminal()
      .getFuturesOpenOrders({ accountId })
      .then(({ items }: BinanceRawFuturesOrderItemsViewModel) =>
        items.map(transformFuturesOrder)
      ) as Promise<FuturesOrder[]>
  );

export const getAllTrades = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<FuturesOrder>> =>
  api
    .terminal()
    .getFuturesTradesHistory({ ...filters, mode: "TradeHistory" })
    .then(({ total, items }: BinanceRawFuturesOrderItemsViewModel) => ({
      total,
      items: items.map(transformFuturesOrder)
    }));

export const getAllOrders = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<FuturesOrder>> =>
  api
    .terminal()
    .getFuturesTradesHistory({ ...filters, mode: "OrderHistory" })
    .then(({ total, items }: BinanceRawFuturesOrderItemsViewModel) => ({
      total,
      items: items.map(transformFuturesOrder)
    }));

export const getUserStreamKey = (
  accountId?: string
): Observable<{ listenKey: string }> =>
  from(
    api
      .terminal()
      .futuresStartAccountStream({ accountId })
      .then((listenKey: string) => ({ listenKey })) as Promise<{
      listenKey: string;
    }>
  );

export const getAccountInformation = (accountId?: string) =>
  api
    .terminal()
    .getFuturesAccountInfo({ accountId })
    .then(mapBinanceRawFuturesAccountInfoToAccount);

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<UnitedTrade[]> =>
  from(
    api
      .terminal()
      .getFuturesSymbolRecentTrades({ symbol, limit })
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
  from(api.terminal().getFutures24HPrices({ symbol }) as Promise<Ticker[]>);

export const getDepth = (
  symbol: string,
  tickSize: string = "0.00000001",
  limit: number = 100
): Observable<CorrectedRestDepth> => {
  const dividerParts = getDividerParts(tickSize);
  return from(
    api
      .terminal()
      .getFuturesOrderBook({ symbol, limit })
      .then((data: BinanceRawOrderBook) => ({
        ...data,
        asks: data.asks.map(transformDepthToString(dividerParts)),
        bids: data.bids.map(transformDepthToString(dividerParts))
      })) as Promise<CorrectedRestDepth>
  );
};

export const cancelAllOrders = (
  { symbol }: { symbol?: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrderId[]> =>
  (api
    .terminal()
    .futuresCancelAllOpenOrders({ symbol, accountId }) as unknown) as Promise<
    BinanceRawCancelOrderId[]
  >;

export const cancelOrder = (
  {
    symbol,
    orderId
  }: { orderId: string; symbol: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrder> =>
  (api.terminal().futuresCancelOrder({
    orderId: +orderId,
    symbol,
    accountId
  }) as unknown) as Promise<BinanceRawCancelOrder>;

const postFuturesOrder = (options: any) =>
  api.terminal().futuresPlaceOrder(options);

const { postSell, postBuy } = createFuturesPlaceBuySellOrderRequest(
  (postFuturesOrder as unknown) as PlaceOrderRequest
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

export const getMarkPrices = (): Observable<MarkPrice[]> =>
  from(api.terminal().getFuturesMarkPrices());

export const getPositionMode = (accountId: string): Promise<PositionModeType> =>
  api
    .terminal()
    .getFuturesPositionMode({ accountId })
    .then(({ positionMode }: BinanceRawFuturesPositionMode) => positionMode);

export const changePositionMode = (options: {
  accountId?: string;
  mode?: BinancePositionMode;
}): Promise<any> => api.terminal().setFuturesPositionMode(options);

export const changeLeverage = (options: {
  accountId?: string;
  symbol?: string;
  leverage?: number;
}): Promise<ChangeLeverageResponse> =>
  api.terminal().changeFuturesInitialLeverageAsync(options);

export const changeMarginMode = (options: {
  accountId?: string;
  symbol?: string;
  marginType?: BinanceFuturesMarginType;
}): Promise<BinanceRawFuturesChangeMarginTypeResult> =>
  api.terminal().changeFuturesMarginType(options);

export const getPositionInformation = (options: {
  symbol?: string;
  accountId?: string;
}): Promise<Position[]> =>
  api.terminal().getFuturesPositionInformation(options);

export const getTransactionHistory = (options: {
  accountId?: string;
  symbol?: string;
  incomeType?: string;
  startTime?: Date;
  endTime?: Date;
  limit?: number;
}): Promise<TransactionHistory[]> =>
  api.terminal().getFuturesIncomeHistory(options);

export const getLeverageBrackets = (options: {
  symbol: string;
  accountId?: string;
}): Promise<SymbolLeverageBrackets[]> =>
  api
    .terminal()
    .getFuturesBrackets(options)
    .then(data =>
      data.map(mapBinanceRawFuturesSymbolBracketToSymbolLeverageBrackets)
    );

export const adjustMargin = (options: {
  accountId: string;
  symbol: string;
  amount: number;
  type: BinanceFuturesMarginChangeDirectionType;
  positionSide: BinancePositionSide;
}): Promise<BinanceRawFuturesPositionMarginResult> =>
  api.terminal().changeFuturesPositionMargin(options);
