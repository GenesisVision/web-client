import { USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Depth,
  IBinanceKline,
  IKline,
  OutboundAccountInfo,
  SpotOrder,
  StreamTicker,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";

export const tradeTransform = ({ T, p, q, a, m }: any): UnitedTrade => {
  return {
    tradeTime: T,
    price: p,
    quantity: q,
    orderId: a,
    buyerIsMaker: m
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

export const transformKlineWs = (data: IBinanceKline): IKline => ({
  time: parseInt(data.k.t),
  close: parseFloat(data.k.c),
  open: parseFloat(data.k.o),
  high: parseFloat(data.k.h),
  low: parseFloat(data.k.l),
  volume: parseFloat(data.k.v)
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

export const transformExecutionReport = (m: any): SpotOrder => ({
  commissionAsset: m.N,
  commission: m.n,
  quoteQuantityFilled: m.Z,
  quantityFilled: m.z,
  eventType: "executionReport",
  executedQuantity: m.l,
  id: m.i,
  orderId: m.i,
  time: m.O,
  // updateTime is wrong. TODO
  updateTime: m.O,
  symbol: m.s,
  type: m.o,
  side: m.S,
  stopPrice: m.P,
  price: m.p,
  quantity: m.q,
  executionType: m.x,
  orderStatus: m.X
});

export const tickerTransform = (m: any): StreamTicker => ({
  eventTime: m.E,
  askPrice: m.a,
  askQuantity: m.A,
  bidPrice: m.b,
  bidQuantity: m.B,
  prevDayClosePrice: 0,
  weightedAveragePrice: 0,
  // eventType: m.e,
  // eventTime: m.E,
  symbol: m.s,
  priceChange: m.p,
  priceChangePercent: m.P,
  // weightedAvgPrice: m.w,
  // prevClosePrice: m.x,
  lastPrice: m.c,
  lastQuantity: m.Q,
  // bestBid: m.b,
  // bestBidQnt: m.B,
  // bestAsk: m.a,
  // bestAskQnt: m.A,
  openPrice: m.o,
  highPrice: m.h,
  lowPrice: m.l,
  baseVolume: m.v,
  quoteVolume: m.q,
  openTime: m.O,
  closeTime: m.C,
  firstTradeId: m.F,
  lastTradeId: m.L,
  totalTrades: m.n
});
