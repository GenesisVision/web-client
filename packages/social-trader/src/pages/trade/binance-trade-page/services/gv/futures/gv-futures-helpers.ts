import {
  BinanceRawFuturesAccountInfo,
  BinanceRawFuturesBracket,
  BinanceRawFuturesOrder,
  BinanceRawFuturesSymbolBracket
} from "gv-api-web";
import {
  Account,
  FuturesOrder,
  FuturesOrderStatus,
  FuturesOrderType,
  LeverageBracket,
  SymbolLeverageBrackets
} from "pages/trade/binance-trade-page/trading/terminal.types";

export const transformFuturesOrder = ({
  status,
  orderId,
  createdTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  positionSide,
  quantity,
  quantityFilled,
  reduceOnly,
  workingType,
  closePosition,
  activatePrice,
  avgPrice,
  callbackRate,
  originalType,
  timeInForce,
  commission,
  commissionAsset,
  realizedProfit
}: BinanceRawFuturesOrder): FuturesOrder => ({
  commission,
  commissionAsset,
  realizedProfit,
  activatePrice,
  averagePrice: avgPrice,
  callbackRate,
  originalType: originalType as FuturesOrderType,
  timeInForce,
  positionSide,
  closePosition,
  quantityFilled,
  workingType,
  reduceOnly,
  orderStatus: status as FuturesOrderStatus,
  time: createdTime,
  symbol,
  type: type as FuturesOrderType,
  side,
  quantity,
  stopPrice,
  price,
  id: orderId,
  // todo
  lastFilledPrice: 0
});

export const mapBinanceRawFuturesAccountInfoToAccount = ({
  canDeposit,
  canTrade,
  canWithdraw,
  updateTime,
  assets
}: BinanceRawFuturesAccountInfo): Account => ({
  makerCommission: 0,
  takerCommission: 0,
  buyerCommission: 0,
  sellerCommission: 0,
  canTrade,
  canWithdraw,
  canDeposit,
  updateTime,
  accountType: "Futures",
  permissions: ["Futures"],
  balances: assets as any
  // balances: assets.map(
  //   mapBinanceRawFuturesAccountAssetToBinanceRawBinanceBalance
  // ),
});

// unusable
// export const mapBinanceRawFuturesAccountAssetToBinanceRawBinanceBalance = ({
//   asset,
//   availableBalance,
//   maintMargin,
//   marginBalance
// }: BinanceRawFuturesAccountAsset): ExtentedBinanceRawBinanceBalance => ({
//   asset,
//   free: availableBalance,
//   locked: 0,
//   total: 0,
//   amountInCurrency: 0,
//   maintMargin,
//   marginBalance
// });

export const mapBinanceRawFuturesSymbolBracketToSymbolLeverageBrackets = ({
  symbol,
  brackets
}: BinanceRawFuturesSymbolBracket): SymbolLeverageBrackets => ({
  symbol,
  brackets: brackets.map(mapBinanceRawFuturesBracketToLeverageBracket)
});

export const mapBinanceRawFuturesBracketToLeverageBracket = ({
  bracket,
  initialLeverage,
  cap,
  floor,
  maintenanceMarginRatio,
  maintAmount
}: BinanceRawFuturesBracket): LeverageBracket => ({
  bracket,
  initialLeverage,
  notionalCap: cap,
  notionalFloor: floor,
  maintMarginRatio: maintenanceMarginRatio,
  maintAmount
});
