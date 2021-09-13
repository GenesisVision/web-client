import { BinancePositionSide } from "gv-api-web";
import {
  FuturesAccount,
  FuturesAccountEventBalance,
  FuturesAccountUpdateEvent,
  FuturesAsset,
  FuturesMarginCallEvent,
  FuturesMarginCallEventPosition,
  FuturesTickerSymbol,
  FuturesTradeOrder,
  FuturesTradeOrderUpdateEvent
} from "pages/trade/binance-trade-page/services/futures/binance-futures.types";
import {
  setUpperFirstLetter,
  USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Account,
  AssetBalance,
  BalanceForTransfer,
  MarkPrice,
  Position,
  Ticker
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

export const transformAccountToBalanceForTransfer = ({
  balances
}: Account): BalanceForTransfer[] => {
  // @ts-ignore
  return balances.map(({ asset, free }) => ({ asset, free }));
};

export const transformMarkPriceWS = (m: any): MarkPrice => ({
  symbol: m.s,
  markPrice: m.p,
  indexPrice: m.i,
  fundingRate: m.r,
  nextFundingTime: m.T,
  time: m.E
});

export const transformFuturesTickerSymbolWS = (m: any): Ticker => ({
  // eventType: m.e,
  symbol: m.s,
  priceChange: m.p,
  priceChangePercent: m.P,
  weightedAveragePrice: m.w,
  prevDayClosePrice: m.x,
  lastPrice: m.c,
  lastQuantity: m.Q,
  bidPrice: m.b,
  bidQuantity: m.B,
  askPrice: m.a,
  askQuantity: m.A,
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

export const transformFuturesTickerSymbol = (
  futuresSymbol: FuturesTickerSymbol
): Ticker => {
  return {
    eventType: "",
    eventTime: 0,
    symbol: futuresSymbol.symbol,
    // @ts-ignore
    priceChange: futuresSymbol.priceChange,
    // @ts-ignore
    priceChangePercent: futuresSymbol.priceChangePercent,
    weightedAvgPrice: futuresSymbol.weightedAvgPrice,
    prevClosePrice: futuresSymbol.prevClosePrice,
    // @ts-ignore
    lastPrice: futuresSymbol.lastPrice,
    lastQty: futuresSymbol.lastQty,
    bestBid: "",
    bestBidQnt: "",
    bestAsk: "",
    bestAskQnt: "",
    open: futuresSymbol.highPrice,
    high: futuresSymbol.lowPrice,
    low: futuresSymbol.volume,
    volume: futuresSymbol.volume,
    volumeQuote: futuresSymbol.quoteVolume,
    // @ts-ignore
    openTime: futuresSymbol.openTime,
    // @ts-ignore
    closeTime: futuresSymbol.closeTime,
    firstTradeId: futuresSymbol.firstId,
    lastTradeId: futuresSymbol.lastId,
    totalTrades: futuresSymbol.count
  };
};

export const transformFuturesBalance = (
  futuresAsset: FuturesAsset
): AssetBalance => {
  return {
    futuresAsset,
    asset: futuresAsset.asset,
    // @ts-ignore
    free: futuresAsset.maxWithdrawAmount,
    // @ts-ignore
    locked: "0"
  };
};

export const transformFuturesAccount = (
  futuresAccount: FuturesAccount
): Account => {
  return {
    balances: (futuresAccount.assets || []).map(transformFuturesBalance),
    buyerCommission: 0,
    canDeposit: futuresAccount.canDeposit,
    canTrade: futuresAccount.canTrade,
    canWithdraw: futuresAccount.canWithdraw,
    makerCommission: 0,
    sellerCommission: 0,
    takerCommission: 0,
    // @ts-ignore
    updateTime: futuresAccount.updateTime
  };
};

export const futuresAccountEventPositionTransform = (socketData: any) => {
  return {
    symbol: socketData.s,
    unrealizedPnL: socketData.up,
    positionSide: setUpperFirstLetter(socketData.ps) as BinancePositionSide,
    positionAmount: socketData.pa,
    entryPrice: socketData.ep

    // entryPrice: number;
    // marginType: BinanceFuturesMarginType;
    // isAutoAddMargin: boolean;
    // isolatedMargin: number;
    // leverage: number;
    // liquidationPrice: number;
    // markPrice: number;
    // symbol: string;
    // positionSide: BinancePositionSide;
    // quantity: number;
    // unrealizedPnL: number;
    // maxNotional: number;
  } as any;
  // TODO: fix type
};

export const futuresMarginCallEventPositionTransform = (
  socketData: any
): FuturesMarginCallEventPosition => {
  return {
    symbol: socketData.s,
    positionSide: socketData.ps,
    positionAmount: socketData.pa,
    marginType: socketData.mt,
    isolatedWallet: socketData.iw,
    markPrice: socketData.mp,
    unrealizedPnL: socketData.up,
    maintenanceMarginRequired: socketData.mm
  };
};

export const futuresEventBalanceTransform = (
  socketData: any
): FuturesAccountEventBalance => {
  return {
    asset: socketData.a,
    free: socketData.wb,
    walletBalance: socketData.wb,
    crossWalletBalance: socketData.cw
  };
};

export const futuresEventTradeOrderTransform = (
  socketData: any
): FuturesTradeOrder => {
  return {
    symbol: socketData.s,
    clientOrderId: socketData.c,
    side: socketData.S,
    orderType: socketData.o,
    timeInForce: socketData.f,
    originalQuantity: socketData.q,
    originalPrice: socketData.p,
    averagePrice: socketData.ap,
    stopPrice: socketData.sp,
    executionType: socketData.x,
    orderStatus: socketData.X,
    orderId: socketData.i,
    orderLastFilledQuantity: socketData.l,
    orderFilledAccumulatedQuantity: socketData.z,
    lastFilledPrice: socketData.L,
    commissionAsset: socketData.N,
    commission: socketData.n,
    orderTradeTime: socketData.T,
    tradeId: socketData.t,
    bidsNotional: socketData.b,
    askNotional: socketData.a,
    isMakerSide: socketData.m,
    isReduceOnly: socketData.R,
    stopPriceWorkingType: socketData.wt,
    ifCloseAll: socketData.cp,
    activationPrice: socketData.AP,
    callbackRate: socketData.cr
  };
};

export const futuresMarginCallEventTransform = (
  socketData: any
): FuturesMarginCallEvent => {
  return {
    eventType: socketData.e,
    eventTime: socketData.E,
    crossWalletBalance: socketData.cw,
    positions: (socketData.p || []).map(futuresMarginCallEventPositionTransform)
  };
};

export const futuresAccountUpdateEventTransform = (
  socketData: any
): FuturesAccountUpdateEvent => {
  return {
    eventType: USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE,
    eventTime: socketData.E,
    transactionTime: socketData.T,
    balances: (socketData.a?.B || []).map(futuresEventBalanceTransform),
    positions: (socketData.a?.P || []).map(futuresAccountEventPositionTransform)
  };
};

export const futuresTradeOrderUpdateEventTransform = (
  socketData: any
): FuturesTradeOrderUpdateEvent => {
  return {
    eventType: socketData.e,
    eventTime: socketData.E,
    transactionTime: socketData.T,
    order: futuresEventTradeOrderTransform(socketData.o)
  };
};

export const filterPositionEventsStream = (
  userStream: Observable<any>
): Observable<FuturesAccountUpdateEvent> =>
  userStream.pipe(
    filter(info => info.eventType === USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE)
  );
