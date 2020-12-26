import { TableDataType } from "constants/constants";
import {
  BinanceFuturesMarginType,
  BinancePositionMode,
  BinanceRawCancelOrder,
  BinanceRawCancelOrderId,
  BinanceRawFuturesChangeMarginTypeResult,
  BinanceRawFuturesPositionMode,
  BinanceRawKlineItemsViewModel,
  BinanceRawOrderBook,
  BinanceRawOrderItemsViewModel,
  BinanceRawRecentTrade,
  TradingPlatformBinanceOrdersMode
} from "gv-api-web";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { getDividerParts } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import {
  Account,
  ChangeLeverageResponse,
  CorrectedRestDepth,
  ExchangeInfo,
  FuturesPositionInformation,
  KlineParams,
  MarkPrice,
  OrderSide,
  PositionModeType,
  SymbolLeverageBrackets,
  Ticker,
  TradeRequest,
  UnitedOrder,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { from, Observable } from "rxjs";
import { api } from "services/api-client/swagger-custom-client";
import { CurrencyEnum } from "utils/types";

import {
  createPlaceBuySellOrderRequest,
  transformDepthToString,
  transformKlineBar,
  transformToUnitedOrder
} from "../../api.helpers";

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  api.terminal().getFuturesExchangeInfo();

export const getKlines = async (params: KlineParams): Promise<Bar[]> => {
  let bars: Bar[] = [];
  const sendRequest = async (startTime: number) => {
    const data = await api
      .terminal()
      .getFuturesKlines(params.symbol, {
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
): Observable<UnitedOrder[]> =>
  from(
    api
      .terminal()
      .getFuturesOpenOrders({ accountId })
      .then(({ items }: BinanceRawOrderItemsViewModel) =>
        items.map(transformToUnitedOrder)
      ) as Promise<UnitedOrder[]>
  );

export const getAllTrades = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<UnitedOrder>> =>
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
}): Promise<TableDataType<UnitedOrder>> =>
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
      .futuresStartAccountStream({ accountId })
      .then((listenKey: string) => ({ listenKey })) as Promise<{
      listenKey: string;
    }>
  );

export const getAccountInformation = (
  accountId?: string,
  currency?: CurrencyEnum
): Observable<Account> =>
  from(
    api.terminal().getFuturesAccountInfo({ accountId, currency }) as Promise<
      Account
    >
  );

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<UnitedTrade[]> =>
  from(
    api
      .terminal()
      .getFuturesSymbolRecentTrades(symbol, { limit })
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
  from(api.terminal().getFutures24HPrices(symbol) as Promise<Ticker[]>);

export const getDepth = (
  symbol: string,
  tickSize: string = "0.00000001",
  limit: number = 100
): Observable<CorrectedRestDepth> => {
  const dividerParts = getDividerParts(tickSize);
  return from(
    api
      .terminal()
      .getFuturesOrderBook(symbol, { limit })
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
  api.terminal().futuresCancelAllOpenOrders({ symbol, accountId });

export const cancelOrder = (
  {
    symbol,
    orderId
  }: { orderId: string; symbol: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrder> =>
  api.terminal().futuresCancelOrder({ orderId, symbol, accountId });

const { postSell, postBuy } = createPlaceBuySellOrderRequest(
  api.terminal().placeOrder
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

export const getMarkPrice = ({
  symbol
}: {
  symbol: string;
}): Promise<MarkPrice> =>
  api
    .terminal()
    .getFuturesMarkPrices({ symbol })
    .then(([price]: MarkPrice[]) => price);

export const getPositionMode = (accountId: string): Promise<PositionModeType> =>
  api
    .terminal()
    .getFuturesPositionMode({ accountId })
    .then(({ positionMode }: BinanceRawFuturesPositionMode) => positionMode);

export const changePositionMode = (options: {
  accountId?: string;
  mode?: BinancePositionMode;
}): Promise<void> => api.terminal().setFuturesPositionMode(options);

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

const mockPositionInformation: FuturesPositionInformation = {
  entryPrice: "0",
  marginType: "Isolated",
  isAutoAddMargin: "0",
  isolatedMargin: "0",
  leverage: "0",
  liquidationPrice: "0",
  markPrice: "0",
  maxNotionalValue: "0",
  positionAmt: "0",
  symbol: "BTCUSDT",
  unRealizedProfit: "0",
  positionSide: "BOTH"
};

export const getPositionInformation = ({}: {
  accountId?: string;
}): Promise<FuturesPositionInformation[]> =>
  Promise.resolve([mockPositionInformation]);

const getMockLeverageBrackets = (symbol: string): SymbolLeverageBrackets => {
  return {
    symbol,
    brackets: [
      {
        bracket: 0,
        initialLeverage: 0,
        notionalCap: 0,
        notionalFloor: 0,
        maintMarginRatio: 0
      }
    ]
  };
};

export const getLeverageBrackets = ({
  symbol
}: {
  symbol: string;
  accountId?: string;
}): Promise<SymbolLeverageBrackets[]> =>
  Promise.resolve([getMockLeverageBrackets(symbol)]);
