import {
  BinanceExecutionType,
  BinanceOrderSide,
  BinancePositionSide
} from "gv-api-web";
import {
  FUTURES_ACCOUNT_EVENT,
  FuturesAccount,
  FuturesAccountEventBalance,
  FuturesAccountUpdateEvent,
  FuturesAsset,
  FuturesMarginCallEvent,
  FuturesMarginCallEventPosition,
  FuturesTickerSymbol,
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
  FuturesOrder,
  FuturesOrderStatus,
  FuturesOrderType,
  MarkPrice,
  PositionMini,
  Ticker
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

import { convertBinanceTypeIntoGV, getWorkingTypeType } from "../api.helpers";

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
  // nextFundingTime is number, not Date
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

export const futuresAccountEventPositionTransform = (
  socketData: any
): PositionMini => {
  return {
    symbol: socketData.s,
    quantity: +socketData.pa,
    entryPrice: +socketData.ep,
    // accumulatedRealized: socketData.cr,
    marginType: setUpperFirstLetter(socketData.mt),
    unrealizedPnL: +socketData.up,
    isolatedMargin: +socketData.iw + +socketData.up, // not sure
    positionSide: setUpperFirstLetter(socketData.ps)
  } as PositionMini;
};

export const futuresMarginCallEventPositionTransform = (
  socketData: any
): FuturesMarginCallEventPosition => {
  return {
    symbol: socketData.s,
    positionSide: setUpperFirstLetter(socketData.ps),
    quantity: socketData.pa,
    marginType: socketData.mt === "ISOLATED" ? "Isolated" : "Cross",
    isolatedWallet: socketData.iw,
    markPrice: socketData.mp,
    unrealizedPnL: socketData.up,
    maintenanceMarginRequired: socketData.mm
  } as FuturesMarginCallEventPosition;
};

export const futuresEventBalanceTransform = (
  socketData: any
): FuturesAccountEventBalance => {
  return {
    asset: socketData.a,
    walletBalance: +socketData.wb,
    crossWalletBalance: +socketData.cw
  };
};

export const futuresEventTradeOrderTransform = (
  socketData: any
): FuturesOrder => {
  return {
    commission: socketData.n,
    commissionAsset: socketData.N,
    realizedProfit: socketData.rp,
    executionType: convertBinanceTypeIntoGV(
      socketData.x
    ) as BinanceExecutionType,
    symbol: socketData.s,
    side: convertBinanceTypeIntoGV(socketData.S) as BinanceOrderSide,
    activatePrice: socketData.AP,
    id: socketData.i,
    closePosition: socketData.cp,
    positionSide: convertBinanceTypeIntoGV(
      socketData.ps
    ) as BinancePositionSide,
    price: socketData.p,
    quantity: socketData.q,
    // or socketData.z or socketData.l
    quantityFilled: socketData.L,
    reduceOnly: socketData.R,
    time: socketData.T,
    originalType: convertBinanceTypeIntoGV(socketData.ot) as FuturesOrderType,
    type: convertBinanceTypeIntoGV(socketData.o) as FuturesOrderType,
    workingType: getWorkingTypeType(socketData.wt),
    eventType: FUTURES_ACCOUNT_EVENT.orderTradeUpdate,
    averagePrice: socketData.ap,
    callbackRate: socketData.cr,
    orderStatus: getWorkingTypeType(socketData.X) as FuturesOrderStatus,
    stopPrice: socketData.sp,
    timeInForce: socketData.f
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
    eventType: socketData.e,
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
  $userStream: Observable<any>
): Observable<FuturesAccountUpdateEvent> =>
  $userStream.pipe(
    filter(info => info.eventType === USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE)
  );
