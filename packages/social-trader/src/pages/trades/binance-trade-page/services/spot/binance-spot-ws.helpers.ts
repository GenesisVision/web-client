import {
  Account,
  Depth,
  ExecutionReport,
  IBinanceKline,
  IKline,
  OutboundAccountInfo,
  Ticker,
  TickerWS,
  Trade
} from "pages/trades/binance-trade-page/trading/terminal.types";
import { USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE } from "pages/trades/binance-trade-page/trading/trading.helpers";

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

export const depthTransform = ({ pu, e, E, s, U, u, b, a }: any): Depth => {
  return {
    prevLastUpdateId: pu,
    eventType: e,
    eventTime: E,
    symbol: s,
    firstUpdateId: U,
    lastUpdateId: u,
    bids: b,
    asks: a
  };
};

export const transformKline = (data: IBinanceKline): IKline => ({
  time: data.k.t,
  open: parseFloat(data.k.o),
  high: parseFloat(data.k.h),
  low: parseFloat(data.k.l),
  close: parseFloat(data.k.c)
});

export const transformOutboundAccountInfo = (m: any): OutboundAccountInfo => ({
  eventType: USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE,
  eventTime: m.E,
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
  type: m.o,
  orderType: m.o,
  timeInForce: m.f,
  quantity: m.q,
  origQty: m.q,
  price: m.p,
  executionType: m.x,
  stopPrice: m.P,
  icebergQuantity: m.F,
  orderStatus: m.X,
  orderRejectReason: m.r,
  orderId: m.i,
  transactionTime: m.T,
  executedQty: m.l,
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
