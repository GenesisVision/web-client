import {
  FuturesAccount,
  FuturesAccountEventBalance,
  FuturesAccountEventPosition,
  FuturesAccountUpdateEvent,
  FuturesAsset,
  FuturesMarginCallEvent,
  FuturesTradeOrder,
  FuturesTradeOrderUpdateEvent
} from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import {
  Account,
  AssetBalance
} from "pages/trades/binance-trade-page/trading/trading.types";

export const transformFuturesBalance = (
  futuresAsset: FuturesAsset
): AssetBalance => {
  return {
    asset: futuresAsset.asset,
    free: futuresAsset.walletBalance,
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
    updateTime: futuresAccount.updateTime
  };
};

export const futuresEventPositionTransform = (
  socketData: any
): FuturesAccountEventPosition => {
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
    positions: (socketData.p || []).map(futuresEventPositionTransform)
  };
};

export const futuresAccountUpdateEventTransform = (
  socketData: any
): FuturesAccountUpdateEvent => {
  return {
    eventType: socketData.e,
    eventTime: socketData.E,
    transactionTime: socketData.T,
    accountUpdate: {
      balances: (socketData.a?.B || []).map(futuresEventBalanceTransform),
      positions: (socketData.a?.P || []).map(futuresEventPositionTransform)
    }
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
