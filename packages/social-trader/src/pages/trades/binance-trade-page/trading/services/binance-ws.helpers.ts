import { ORDER_STATUSES } from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import {
  Account,
  Depth,
  ExecutionReport,
  Ticker,
  TickerWS,
  Trade
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

export const tradeTransform = ({
  e,
  E,
  T,
  s,
  p,
  q,
  m,
  M,
  t,
  a,
  b
}: any): Trade => {
  return {
    eventType: e,
    eventTime: E,
    time: T,
    symbol: s,
    price: p,
    qty: q,
    isBuyerMaker: m,
    maker: M,
    id: t,
    sellerOrderId: a,
    buyerOrderId: b
  };
};

export const depthTransform = ({ e, E, s, U, u, b, a }: any): Depth => {
  return {
    eventType: e,
    eventTime: E,
    symbol: s,
    firstUpdateId: U,
    lastUpdateId: u,
    bids: b,
    asks: a
  };
};
export const transformOutboundAccountInfo = (m: any): Account => ({
  makerCommission: m.m,
  takerCommission: m.t,
  buyerCommission: m.b,
  sellerCommission: m.s,
  canTrade: m.T,
  canWithdraw: m.W,
  canDeposit: m.D,
  updateTime: m.u,
  balances: m.B.map(({ f, l, a }: any) => ({ free: f, locked: l, asset: a }))
});

export const transformExecutionReport = (m: any): ExecutionReport => ({
  eventType: "executionReport",
  eventTime: m.E,
  symbol: m.s,
  newClientOrderId: m.c,
  originalClientOrderId: m.C,
  side: m.S,
  orderType: m.o,
  timeInForce: m.f,
  quantity: m.q,
  price: m.p,
  executionType: m.x,
  stopPrice: m.P,
  icebergQuantity: m.F,
  orderStatus: m.X,
  orderRejectReason: m.r,
  orderId: m.i,
  transactionTime: m.T,
  lastTradeQuantity: m.l,
  totalTradeQuantity: m.z,
  priceLastTrade: m.L,
  commission: m.n,
  commissionAsset: m.N,
  tradeId: m.t,
  isOrderWorking: m.w,
  isBuyerMaker: m.m,
  orderCreationTime: m.O,
  totalQuoteTradeQuantity: m.Z
});

export const filterOutboundAccountInfoStream = (
  userStream: Observable<any>
): Observable<Account> =>
  userStream.pipe(
    filter(info => info.e === "outboundAccountInfo"),
    map(transformOutboundAccountInfo)
  );

export const filterOpenOrdersStream = (
  userStream: Observable<any>
): Observable<ExecutionReport> =>
  userStream.pipe(
    filter(info => info.e === "executionReport"),
    filter(
      item =>
        item.X !== ORDER_STATUSES.FILLED &&
        item.X !== ORDER_STATUSES.PARTIALLY_FILLED &&
        item.X !== ORDER_STATUSES.REJECTED
    ),
    map(transformExecutionReport)
  );

export const userTransforms = {
  outboundAccountInfo: (m: any) => ({
    eventType: "account",
    eventTime: m.E,
    makerCommissionRate: m.m,
    takerCommissionRate: m.t,
    buyerCommissionRate: m.b,
    sellerCommissionRate: m.s,
    canTrade: m.T,
    canWithdraw: m.W,
    canDeposit: m.D,
    lastAccountUpdate: m.u,
    balances: m.B.reduce((out: any, cur: any) => {
      out[cur.a] = { available: cur.f, locked: cur.l };
      return out;
    }, {})
  }),
  executionReport: (m: any) => ({
    eventType: "executionReport",
    eventTime: m.E,
    symbol: m.s,
    newClientOrderId: m.c,
    originalClientOrderId: m.C,
    side: m.S,
    orderType: m.o,
    timeInForce: m.f,
    quantity: m.q,
    price: m.p,
    executionType: m.x,
    stopPrice: m.P,
    icebergQuantity: m.F,
    orderStatus: m.X,
    orderRejectReason: m.r,
    orderId: m.i,
    orderTime: m.T,
    lastTradeQuantity: m.l,
    totalTradeQuantity: m.z,
    priceLastTrade: m.L,
    commission: m.n,
    commissionAsset: m.N,
    tradeId: m.t,
    isOrderWorking: m.w,
    isBuyerMaker: m.m,
    creationTime: m.O,
    totalQuoteTradeQuantity: m.Z
  })
};

export const tickerTransform = (m: TickerWS): Ticker => ({
  eventType: m.e,
  eventTime: m.E,
  symbol: m.s,
  priceChange: m.p,
  priceChangePercent: m.P,
  weightedAvgPrice: m.w,
  prevClosePrice: m.x,
  lastPrice: m.c,
  lastQty: m.Q,
  bestBid: m.b,
  bestBidQnt: m.B,
  bestAsk: m.a,
  bestAskQnt: m.A,
  open: m.o,
  high: m.h,
  low: m.l,
  volume: m.v,
  volumeQuote: m.q,
  openTime: m.O,
  closeTime: m.C,
  firstTradeId: m.F,
  lastTradeId: m.L,
  totalTrades: m.n
});
