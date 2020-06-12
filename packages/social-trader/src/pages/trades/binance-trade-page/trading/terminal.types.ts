import {
  FuturesAccountEventType,
  FuturesAsset
} from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import { Bar } from "pages/trades/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { Observable } from "rxjs";
import { ConnectSocketMethodType } from "services/websocket.service";
import { AnyObjectType } from "utils/types";

export type MarginModeType = "ISOLATED" | "CROSSED";

export type TerminalType = "spot" | "futures";

export type PositionSideType = "BOTH" | "LONG" | "SHORT";

export type PositionModeType = boolean;

export type BalancesItemName = "spot" | "futures";

export interface DepthFullAmount {
  bids: number;
  asks: number;
}

export interface SymbolSummaryData {
  markPrice?: MarkPrice;
  tickerData: MergedTickerSymbolType;
}

export interface MarkPrice {
  symbol: string;
  markPrice: string;
  lastFundingRate: string; // This is the lasted funding rate
  nextFundingTime: number;
  time: number;
}

export interface BalanceForTransfer {
  asset: TerminalCurrency;
  free: string;
}

export interface BalancesForTransfer {
  spot: BalanceForTransfer[];
  futures: BalanceForTransfer[];
}

export interface PositionModeResponse {
  dualSidePosition: PositionModeType;
}

export interface FuturesPositionInformation {
  entryPrice: string;
  marginType: MarginModeType;
  isAutoAddMargin: string;
  isolatedMargin: string;
  leverage: string;
  liquidationPrice: string;
  markPrice: string;
  maxNotionalValue: string;
  positionAmt: string;
  symbol: string;
  unRealizedProfit: string;
  positionSide: PositionSideType;
}

export interface FuturesPosition {
  isolated: boolean;
  leverage: string;
  initialMargin: string;
  maintMargin: string;
  openOrderInitialMargin: string;
  positionInitialMargin: string;
  symbol: string;
  unrealizedProfit: string;
  positionSide: PositionSideType; // BOTH means that it is the position of One-way Mode
}

export interface LeverageBracket {
  bracket: number; // Notianl bracket
  initialLeverage: number; // Max initial leverge for this bracket
  notionalCap: number; // Cap notional of this bracket
  notionalFloor: number; // Notionl threshold of this bracket
  maintMarginRatio: number; // Maintenance ratio for this bracket
}

export interface SymbolLeverageBrackets {
  symbol: string;
  brackets: LeverageBracket[];
}

export interface TradeRequest {
  reduceOnly?: boolean;
  timeInForce?: TimeInForce;
  stopPrice?: number;
  symbol: TerminalCurrency;
  price: number;
  quantity: number;
  type: OrderType;
}

export type TerminalAuthDataType = { publicKey: string; privateKey: string };

export type KlineSocketType = (
  symbol: string,
  interval: string
) => Observable<IKline>;

export interface IKline {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IBinanceKline {
  e: string; // Event type
  E: string; // Event time
  s: string; // Symbol
  k: {
    t: string; // Kline start time
    T: string; // Kline close time
    s: string; // Symbol
    i: string; // Interva\
    f: string; // First trade ID
    L: string; // Last trade ID
    o: string; // Open price
    c: string; // Close price
    h: string; // High price
    l: string; // Low price
    v: string; // Base asset volume
    n: string; // Number of trades
    x: boolean; // Is this kline closed?
    q: string; // Quote asset volume
    V: string; // Taker buy base asset volume
    Q: string; // Taker buy quote asset volume
    B: string; // Ignore
  };
}

export interface ITerminalMethods {
  getMarkPrice?: (options: { symbol: string }) => Observable<MarkPrice>;
  getServerTime: () => Promise<{ serverTime: number }>;
  getBalancesForTransfer?: (options: {
    authData: TerminalAuthDataType;
  }) => Promise<BalancesForTransfer>;
  newFutureAccountTransfer?: (options: {
    asset: TerminalCurrency;
    amount: number;
    type: number; // 1 | 2
    authData: TerminalAuthDataType;
  }) => Promise<HttpResponse>;
  getPositionMode?: (options: {
    authData: TerminalAuthDataType;
  }) => Promise<PositionModeType>;
  changePositionMode?: (options: {
    dualSidePosition: PositionModeType;
    authData: TerminalAuthDataType;
  }) => Promise<HttpResponse>;
  getKlines: (params: KlineParams) => Promise<Bar[]>;
  getPositionInformation?: (options: {
    authData: TerminalAuthDataType;
  }) => Observable<FuturesPositionInformation[]>;
  getLeverageBrackets?: (options: {
    symbol: string;
    authData: TerminalAuthDataType;
  }) => Promise<SymbolLeverageBrackets[]>;
  changeLeverage?: (options: {
    leverage: number;
    symbol: string;
    authData: TerminalAuthDataType;
  }) => Promise<ChangeLeverageResponse>;
  changeMarginMode?: (options: {
    mode: MarginModeType;
    symbol: string;
    authData: TerminalAuthDataType;
  }) => Promise<HttpResponse>;
  getExchangeInfo: () => Promise<ExchangeInfo>;
  getOpenOrders: (
    symbol: string,
    authData: TerminalAuthDataType
  ) => Observable<QueryOrderResult[]>;
  getAllOrders: (
    symbol: string,
    authData: TerminalAuthDataType
  ) => Observable<QueryOrderResult[]>;
  getUserStreamKey: (
    authData: TerminalAuthDataType
  ) => Observable<{ listenKey: string }>;
  getAccountInformation: (
    authData: TerminalAuthDataType
  ) => Observable<Account>;
  getTrades: (symbol: string, limit?: number) => Observable<Trade[]>;
  getTickers: (symbol?: string) => Observable<Ticker[]>;
  getDepth: (symbol: string, limit?: number) => Observable<Depth>;
  cancelAllOrders: (
    options: { symbol: string; useServerTime?: boolean },
    authData: TerminalAuthDataType
  ) => Promise<CancelOrderResult>;
  cancelOrder: (
    options: { symbol: string; orderId: string; useServerTime?: boolean },
    authData: TerminalAuthDataType
  ) => Promise<CancelOrderResult>;
  tradeRequest: ({
    side,
    ...options
  }: TradeRequest & {
    authData: TerminalAuthDataType;
    side: OrderSide;
  }) => Promise<QueryOrderResult>;

  // Sockets

  markPriceSocket?: (
    connectSocketMethod: ConnectSocketMethodType,
    symbol: TerminalCurrency
  ) => Observable<MarkPrice>;
  tradeSocket: (
    connectSocketMethod: ConnectSocketMethodType,
    symbol: TerminalCurrency
  ) => Observable<Trade>;
  depthSocket: (
    connectSocketMethod: ConnectSocketMethodType,
    symbol: TerminalCurrency
  ) => Observable<Depth>;
  marketTicketsSocket: (
    connectSocketMethod: ConnectSocketMethodType
  ) => Observable<Ticker[]>;
  getUserStreamSocket: (
    connectSocketMethod: ConnectSocketMethodType,
    listenKey: string
  ) => Observable<any>;
  klineSocket: (
    connectSocketMethod: ConnectSocketMethodType
  ) => KlineSocketType;
}

export interface IConfigurationData {
  exchanges?: { value: string; name: string; desc: string }[];
  symbols_types?: { name: string; value: string }[];
  supported_resolutions?: string[];
  supports_marks?: boolean;
  supports_timescale_marks?: boolean;
  supports_time?: boolean;
  futures_regex?: string;
}

export type ChartSymbolTypeType =
  | "stock"
  | "index"
  | "forex"
  | "futures"
  | "bitcoin"
  | "expression"
  | "spread"
  | "cfd"
  | string;

export interface IChartSymbolShort {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  ticker?: string;
  type: ChartSymbolTypeType;
}

export interface IChartSymbolFull {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  ticker?: string;
  type: ChartSymbolTypeType;
  session: number;
  listed_exchange: string;
  timezone: string;
  minmov: any;
  pricescale: any;
  minmove2: any;
  fractional: any;
  has_intraday: boolean;
  supported_resolutions: string[];
  intraday_multipliers: string[];
  has_seconds: boolean;
  seconds_multipliers: string[];
  has_daily: boolean;
  has_weekly_and_monthly: boolean;
  has_empty_bars: boolean;
  force_session_rebuild: boolean;
  has_no_volume: boolean;
  volume_precision: number;
  data_status: "streaming" | "endofday" | "pulsed" | "delayed_streaming";
  expired: boolean;
  expiration_date: number;
  sector: any;
  industry: any;
  currency_code: string;
}

export interface IChartBar {
  time: number;
  close: string;
  open: string;
  high: string;
  low: string;
  volume: string;
}

export type SubscriberUIDType = AnyObjectType | string;

export interface IChartMark {
  id: string;
  time: number;
  color:
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | { border: string; background: string };
  text: string;
  label: string;
  labelFontColor: string;
  minSize: number;
}

export interface IChartTimeScaleMark {
  id: string;
  time: number;
  color: "red" | "green" | "blue" | "yellow" | string;
  tooltip: string;
  label: string;
}

export interface IChartSymbolQuoteData {
  s: "ok" | "error";
  n: string;
  v: {
    ch: string;
    chp: string;
    short_name: string;
    exchange: string;
    description: string;
    lp: string;
    ask: string;
    bid: string;
    spread: string;
    open_price: string;
    high_price: string;
    low_price: string;
    prev_close_price: string;
    volume: string;
  };
}

export interface IChartDepth {
  snapshot: boolean;
  asks: { price: string; volume: string }[];
  bids: { price: string; volume: string }[];
}

export interface IChartData {
  onReady: (callback: () => IConfigurationData) => void;
  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbols: IChartSymbolShort[]) => void
  ) => void;
  resolveSymbol: (
    symbolName: string,
    onSymbolResolvedCallback: (symbol: IChartSymbolFull) => void,
    onResolveErrorCallback: (reason: string) => void
  ) => void;
  getBars: (
    symbolInfo: IChartSymbolFull,
    resolution: string,
    from: number,
    to: number,
    onHistoryCallback: (
      bars: IChartBar,
      meta: { noData: boolean; nextTime: number }
    ) => void,
    onErrorCallback: (reason: string) => void,
    firstDataRequest: boolean
  ) => void;
  subscribeBars: (
    symbolInfo: IChartSymbolFull,
    resolution: string,
    onRealtimeCallback: (bar: IChartBar) => void,
    subscriberUID: SubscriberUIDType,
    onResetCacheNeededCallback: () => void
  ) => void;
  unsubscribeBars: (subscriberUID: SubscriberUIDType) => void;
  calculateHistoryDepth?: (
    resolution: string,
    resolutionBack: string,
    intervalBack: number
  ) => { resolutionBack: string; intervalBack: number };
  getMarks?: (
    symbolInfo: IChartSymbolFull,
    from: number,
    to: number,
    onDataCallback: (marks: IChartMark[]) => void,
    resolution: string
  ) => void;
  getTimescaleMarks?: (
    symbolInfo: IChartSymbolFull,
    from: number,
    to: number,
    onDataCallback: (marks: IChartTimeScaleMark[]) => void,
    resolution: string
  ) => void;
  getServerTime?: (time: number) => void;
  getQuotes: (
    symbols: string[],
    onDataCallback: (data: IChartSymbolQuoteData[]) => void,
    onErrorCallback: (reason: string) => void
  ) => void;
  subscribeQuotes: (
    symbols: string[],
    fastSymbols: string[],
    onRealtimeCallback: (data: IChartSymbolQuoteData[]) => void,
    listenerGUID: SubscriberUIDType
  ) => void;
  unsubscribeQuotes: (listenerGUID: SubscriberUIDType) => string;
  subscribeDepth: (
    symbolInfo: IChartSymbolFull,
    callback: (depth: IChartDepth) => void
  ) => SubscriberUIDType;
  unsubscribeDepth: (subscriberUID: SubscriberUIDType) => void;
}

export type TerminalCurrency = string;

export type MergedTickerSymbolType = Ticker & Symbol;

export enum ErrorCodes {
  UNKNOWN = -1000,
  DISCONNECTED = -1001,
  UNAUTHORIZED = -1002,
  TOO_MANY_REQUESTS = -1003,
  UNEXPECTED_RESP = -1006,
  TIMEOUT = -1007,
  INVALID_MESSAGE = -1013,
  UNKNOWN_ORDER_COMPOSITION = -1014,
  TOO_MANY_ORDERS = -1015,
  SERVICE_SHUTTING_DOWN = -1016,
  UNSUPPORTED_OPERATION = -1020,
  INVALID_TIMESTAMP = -1021,
  INVALID_SIGNATURE = -1022,
  ILLEGAL_CHARS = -1100,
  TOO_MANY_PARAMETERS = -1101,
  MANDATORY_PARAM_EMPTY_OR_MALFORMED = -1102,
  UNKNOWN_PARAM = -1103,
  UNREAD_PARAMETERS = -1104,
  PARAM_EMPTY = -1105,
  PARAM_NOT_REQUIRED = -1106,
  NO_DEPTH = -1112,
  TIF_NOT_REQUIRED = -1114,
  INVALID_TIF = -1115,
  INVALID_ORDER_TYPE = -1116,
  INVALID_SIDE = -1117,
  EMPTY_NEW_CL_ORD_ID = -1118,
  EMPTY_ORG_CL_ORD_ID = -1119,
  BAD_INTERVAL = -1120,
  BAD_SYMBOL = -1121,
  INVALID_LISTEN_KEY = -1125,
  MORE_THAN_XX_HOURS = -1127,
  OPTIONAL_PARAMS_BAD_COMBO = -1128,
  INVALID_PARAMETER = -1130,
  BAD_API_ID = -2008,
  DUPLICATE_API_KEY_DESC = -2009,
  INSUFFICIENT_BALANCE = -2010,
  CANCEL_ALL_FAIL = -2012,
  NO_SUCH_ORDER = -2013,
  BAD_API_KEY_FMT = -2014,
  REJECTED_MBX_KEY = -2015
}

export interface Account {
  positions?: FuturesPosition[];
  balances: AssetBalance[];
  buyerCommission: number;
  canDeposit: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  makerCommission: number;
  sellerCommission: number;
  takerCommission: number;
  updateTime: number;
}

export interface TradeFee {
  symbol: string;
  maker: number;
  taker: number;
}

export interface TradeFeeResult {
  tradeFee: TradeFee[];
  success: boolean;
}

export interface AggregatedTrade {
  aggId: number;
  symbol: string;
  price: string;
  quantity: string;
  firstId: number;
  lastId: number;
  timestamp: number;
  isBuyerMaker: boolean;
  wasBestPrice: boolean;
}

export interface AssetBalance {
  futuresAsset?: FuturesAsset;
  asset: string;
  free: string;
  locked: string;
}

export interface DepositAddress {
  address: string;
  addressTag: string;
  asset: string;
  success: boolean;
}

export interface WithdrawResponse {
  id: string;
  msg: string;
  success: boolean;
}

export enum DepositStatus {
  PENDING = 0,
  SUCCESS = 1
}

export interface DepositHistoryResponse {
  depositList: {
    insertTime: number;
    amount: number;
    asset: string;
    address: string;
    txId: string;
    status: DepositStatus;
  }[];
  success: boolean;
}

export enum WithdrawStatus {
  EMAIL_SENT = 0,
  CANCELLED = 1,
  AWAITING_APPROVAL = 2,
  REJECTED = 3,
  PROCESSING = 4,
  FAILURE = 5,
  COMPLETED = 6
}

export interface WithdrawHistoryResponse {
  withdrawList: {
    id: string;
    amount: number;
    transactionFee: number;
    address: string;
    asset: string;
    txId: string;
    applyTime: number;
    status: WithdrawStatus;
  }[];
  success: boolean;
}

export interface AssetDetail {
  success: boolean;
  assetDetail: {
    [asset: string]: {
      minWithdrawAmount: number;
      depositStatus: boolean;
      withdrawFee: number;
      withdrawStatus: boolean;
      depositTip?: string;
    };
  };
}

export interface Binance {
  accountInfo(options?: { useServerTime: boolean }): Promise<Account>;

  tradeFee(): Promise<TradeFeeResult>;

  aggTrades(options?: {
    symbol: string;
    fromId?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
  }): Promise<AggregatedTrade[]>;

  allBookTickers(): Promise<{ [key: string]: Ticker }>;

  book(options: { symbol: string; limit?: number }): Promise<OrderBook>;

  exchangeInfo(): Promise<ExchangeInfo>;

  order(options: NewOrder): Promise<Order>;

  orderTest(options: NewOrder): Promise<Order>;

  orderOco(options: NewOcoOrder): Promise<OcoOrder>;

  ping(): Promise<boolean>;

  prices(): Promise<{ [index: string]: string }>;

  avgPrice(options?: {
    symbol: string;
  }): Promise<AvgPriceResult | AvgPriceResult[]>;

  time(): Promise<number>;

  trades(options: { symbol: string; limit?: number }): Promise<TradeResult[]>;

  ws: WebSocket;

  myTrades(options: {
    symbol: string;
    limit?: number;
    fromId?: number;
    useServerTime?: boolean;
  }): Promise<MyTrade[]>;

  getOrder(options: {
    symbol: string;
    orderId: number;
    useServerTime?: boolean;
  }): Promise<QueryOrderResult>;

  cancelOrder(options: {
    symbol: string;
    orderId: number;
    useServerTime?: boolean;
  }): Promise<CancelOrderResult>;

  openOrders(options: {
    symbol?: string;
    useServerTime?: boolean;
  }): Promise<QueryOrderResult[]>;

  allOrders(options: {
    symbol?: string;
    useServerTime?: boolean;
  }): Promise<QueryOrderResult[]>;

  dailyStats(options?: {
    symbol: string;
  }): Promise<DailyStatsResult | DailyStatsResult[]>;

  candles(options: CandlesOptions): Promise<CandleChartResult[]>;

  tradesHistory(options: {
    symbol: string;
    limit?: number;
    fromId?: number;
  }): Promise<Trade[]>;

  depositAddress(options: { asset: string }): Promise<DepositAddress>;

  withdraw(options: {
    asset: string;
    address: string;
    amount: number;
    name?: string;
  }): Promise<WithdrawResponse>;

  assetDetail(): Promise<AssetDetail>;

  withdrawHistory(options: {
    asset: string;
    status?: number;
    startTime?: number;
    endTime?: number;
  }): Promise<WithdrawHistoryResponse>;

  depositHistory(options: {
    asset: string;
    status?: number;
    startTime?: number;
    endTime?: number;
  }): Promise<DepositHistoryResponse>;
}

export interface ChangeLeverageResponse {
  leverage: number;
  maxNotionalValue: string;
  symbol: string;
}

export interface HttpResponse {
  code: number;
  msg: string;
}

export interface HttpError extends Error {
  code: number;
  url: string;
}

export interface WebSocket {
  depth: (
    pair: string | string[],
    callback: (depth: Depth) => void
  ) => ReconnectingWebSocketHandler;
  partialDepth: (
    options:
      | { symbol: string; level: number }
      | { symbol: string; level: number }[],
    callback: (depth: PartialDepth) => void
  ) => ReconnectingWebSocketHandler;
  ticker: (
    pair: string | string[],
    callback: (ticker: Ticker) => void
  ) => ReconnectingWebSocketHandler;
  allTickers: (
    callback: (tickers: Ticker[]) => void
  ) => ReconnectingWebSocketHandler;
  candles: (
    pair: string | string[],
    period: string,
    callback: (ticker: Candle) => void
  ) => ReconnectingWebSocketHandler;
  trades: (
    pairs: string | string[],
    callback: (trade: Trade) => void
  ) => ReconnectingWebSocketHandler;
  aggTrades: (
    pairs: string | string[],
    callback: (trade: Trade) => void
  ) => ReconnectingWebSocketHandler;
  user: (
    callback: (msg: OutboundAccountInfo | ExecutionReport) => void
  ) => Function;
  marginUser: (
    callback: (msg: OutboundAccountInfo | ExecutionReport) => void
  ) => Function;
}

export type ReconnectingWebSocketHandler = (options?: {
  keepClosed: boolean;
  fastClose: boolean;
  delay: number;
}) => void;

export enum CandleChartInterval {
  ONE_MINUTE = "1m",
  THREE_MINUTES = "3m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  TWO_HOURS = "2h",
  FOUR_HOURS = "4h",
  SIX_HOURS = "6h",
  EIGHT_HOURS = "8h",
  TWELVE_HOURS = "12h",
  ONE_DAY = "1d",
  THREE_DAYS = "3d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M"
}

export type RateLimitType = "REQUEST_WEIGHT" | "ORDERS";

export type RateLimitInterval = "SECOND" | "MINUTE" | "DAY";

export interface ExchangeInfoRateLimit {
  rateLimitType: RateLimitType;
  interval: RateLimitInterval;
  intervalNum: number;
  limit: number;
}

export type ExchangeFilterType =
  | "EXCHANGE_MAX_NUM_ORDERS"
  | "EXCHANGE_MAX_ALGO_ORDERS";

export interface ExchangeFilter {
  filterType: ExchangeFilterType;
  limit: number;
}

export type SymbolFilterType =
  | "PRICE_FILTER"
  | "PERCENT_PRICE"
  | "LOT_SIZE"
  | "MIN_NOTIONAL"
  | "MAX_NUM_ORDERS"
  | "MAX_ALGO_ORDERS";

export interface SymbolPriceFilter {
  filterType: SymbolFilterType;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

export interface SymbolPercentPriceFilter {
  filterType: SymbolFilterType;
  multiplierDown: string;
  multiplierUp: string;
  avgPriceMins: number;
}

export interface SymbolLotSizeFilter {
  filterType: SymbolFilterType;
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface SymbolMinNotionalFilter {
  applyToMarket: boolean;
  avgPriceMins: number;
  filterType: SymbolFilterType;
  minNotional: string;
}

export interface SymbolMaxNumOrdersFilter {
  filterType: SymbolFilterType;
  limit: number;
}

export interface SymbolMaxAlgoOrdersFilter {
  filterType: SymbolFilterType;
  limit: number;
}

export type SymbolFilter =
  | SymbolPriceFilter
  | SymbolPercentPriceFilter
  | SymbolLotSizeFilter
  | SymbolMinNotionalFilter
  | SymbolMaxNumOrdersFilter
  | SymbolMaxAlgoOrdersFilter;

export interface Symbol {
  baseAsset: string;
  baseAssetPrecision: number;
  baseCommissionPrecision: number;
  filters: SymbolFilter[];
  icebergAllowed: boolean;
  isMarginTradingAllowed: boolean;
  isSpotTradingAllowed: boolean;
  ocoAllowed: boolean;
  orderTypes: OrderType[];
  quoteAsset: string;
  quoteCommissionPrecision: number;
  quoteOrderQtyMarketAllowed: boolean;
  quotePrecision: number;
  status: string;
  symbol: string;
}

export interface ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: ExchangeInfoRateLimit[];
  exchangeFilters: ExchangeFilter[];
  symbols: Symbol[];
}

export interface KlineParams {
  symbol: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface OrderBook {
  lastUpdateId: number;
  asks: Bid[];
  bids: Bid[];
}

export interface NewOrder {
  icebergQty?: string;
  newClientOrderId?: string;
  price?: string;
  quantity: string;
  recvWindow?: number;
  side: OrderSide;
  stopPrice?: string;
  symbol: string;
  timeInForce?: TimeInForce;
  useServerTime?: boolean;
  type: OrderType;
  newOrderRespType?: NewOrderRespType;
}

export interface NewOcoOrder {
  symbol: string;
  listClientOrderId?: string;
  side: OrderSide;
  quantity: string;
  limitClientOrderId?: string;
  price: string;
  limitIcebergQty?: string;
  stopClientOrderId?: string;
  stopPrice: string;
  stopLimitPrice?: string;
  stopIcebergQty?: string;
  stopLimitTimeInForce?: TimeInForce;
  newOrderRespType?: NewOrderRespType;
  recvWindow?: number;
  useServerTime?: boolean;
}

export interface OrderFill {
  price: string;
  qty: string;
  commission: string;
  commissionAsset: string;
}

export interface Order {
  clientOrderId: string;
  cummulativeQuoteQty: string;
  executedQty: string;
  icebergQty?: string;
  orderId: number;
  orderListId: number;
  origQty: string;
  price: string;
  side: OrderSide;
  status: OrderStatus;
  stopPrice?: string;
  symbol: string;
  timeInForce: TimeInForce;
  transactTime: number;
  type: OrderType;
  fills?: OrderFill[];
}

export interface OcoOrder {
  orderListId: number;
  contingencyType: ContingencyType;
  listStatusType: ListStatusType;
  listOrderStatus: ListOrderStatus;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: Order[];
  orderReports: Order[];
}

export type OrderSide = "BUY" | "SELL";

export type OrderStatus =
  | "CANCELED"
  | "EXPIRED"
  | "FILLED"
  | "NEW"
  | "PARTIALLY_FILLED"
  | "PENDING_CANCEL"
  | "REJECTED";

export type OrderType =
  | "LIMIT"
  | "LIMIT_MAKER"
  | "MARKET"
  | "STOP_LOSS"
  | "STOP_LOSS_LIMIT"
  | "TAKE_PROFIT"
  | "TAKE_PROFIT_LIMIT";

export type ListOrderStatus = "EXECUTING" | "ALL_DONE" | "REJECT";

export type ListStatusType = "RESPONSE" | "EXEC_STARTED" | "ALL_DONE";

export type ContingencyType = "OCO";

export type NewOrderRespType = "ACK" | "RESULT" | "FULL";

export type TimeInForce = "GTX" | "GTC" | "IOC" | "FOK";

export type ExecutionType =
  | "NEW"
  | "CANCELED"
  | "REPLACED"
  | "REJECTED"
  | "TRADE"
  | "EXPIRED";

export type EventType =
  | ("executionReport" | "account" | "outboundAccountInfo")
  | FuturesAccountEventType;

export interface DepthMain {
  eventType: string;
  eventTime: number;
  symbol: string;
  firstUpdateId: number;
  lastUpdateId: number;
  prevLastUpdateId?: number;
}

export type NormalizedDepthList = { [keys: string]: StringBidDepth };

export interface NormalizedDepth extends DepthMain {
  bids: NormalizedDepthList;
  asks: NormalizedDepthList;
}

export interface Depth extends DepthMain {
  bids: StringBidDepth[];
  asks: StringBidDepth[];
}

export type StringBidDepth = Array<string>;

export interface BidDepth {
  price: string;
  quantity: string;
}

export interface PartialDepth {
  symbol: string;
  level: number;
  bids: Bid[];
  asks: Bid[];
}

export interface Bid {
  price: string;
  quantity: string;
}

export interface TickerWS {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
}

export interface Ticker {
  eventType: string;
  eventTime: number;
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bestBid: string;
  bestBidQnt: string;
  bestAsk: string;
  bestAskQnt: string;
  open: string;
  high: string;
  low: string;
  volume: string;
  volumeQuote: string;
  openTime: number;
  closeTime: number;
  firstTradeId: number;
  lastTradeId: number;
  totalTrades: number;
}

export interface Candle {
  eventType: string;
  eventTime: number;
  symbol: string;
  startTime: number;
  closeTime: number;
  firstTradeId: number;
  lastTradeId: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  trades: number;
  interval: string;
  isFinal: boolean;
  quoteVolume: string;
  buyVolume: string;
  quoteBuyVolume: string;
}

export interface Message {
  eventType: EventType;
  eventTime: number;
}

export interface Balance {
  asset: string;
  free: string;
  locked: string;
}

export type Balances = Balance[];

export interface OutboundAccountInfo extends Message {
  balances: Balances;
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
}

export interface ExecutionReport extends Message {
  symbol: string;
  newClientOrderId: string;
  originalClientOrderId: string;
  side: OrderSide;
  type: OrderType;
  orderType: OrderType;
  timeInForce: TimeInForce;
  quantity: string;
  origQty: string;
  price: string;
  executionType: ExecutionType;
  stopPrice: string;
  icebergQuantity: string;
  status?: OrderStatus;
  orderStatus: OrderStatus;
  orderRejectReason: string;
  orderId: number;
  transactionTime: number;
  orderCreationTime: number;
  executedQty: string;
  lastTradeQuantity: string;
  totalTradeQuantity: string;
  priceLastTrade: string;
  commission: string;
  commissionAsset: string;
  tradeId: number;
  isOrderWorking: boolean;
  isBuyerMaker: boolean;
  totalQuoteTradeQuantity: string;
}

export interface TradeResult {
  id: number;
  price: string;
  qty: string;
  quoteQty?: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch?: boolean;
}

export interface Trade extends TradeResult {
  buyerOrderId: string;
  sellerOrderId: string;
  eventType: string;
  eventTime: number;
  symbol: string;
  maker: boolean;
}

export interface MyTrade {
  id: number;
  orderId: number;
  orderListId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}

export interface QueryOrderResult {
  origQuoteOrderQty: string;
  orderListId: number;
  clientOrderId: string;
  cummulativeQuoteQty: string;
  executedQty: string;
  icebergQty: string;
  isWorking: boolean;
  orderId: number;
  origQty: string;
  price: string;
  side: OrderSide;
  status: OrderStatus;
  stopPrice: string;
  symbol: string;
  time: number;
  timeInForce: TimeInForce;
  type: OrderType;
  updateTime: number;
}

export interface CancelOrderResult {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  clientOrderId: string;
}

export interface AvgPriceResult {
  mins: number;
  price: string;
}

export interface DailyStatsResult {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number; // First tradeId
  lastId: number; // Last tradeId
  count: number; // Trade count
}

export interface CandlesOptions {
  symbol: string;
  interval: CandleChartInterval;
  limit?: number;
  startTime?: number;
  endTime?: number;
}

export interface CandleChartResult {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteVolume: string;
  trades: number;
  baseAssetVolume: string;
  quoteAssetVolume: string;
}
