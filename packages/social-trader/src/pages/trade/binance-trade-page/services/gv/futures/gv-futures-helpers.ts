import {
  BinanceRawFuturesAccountAsset,
  BinanceRawFuturesAccountInfo,
  BinanceRawFuturesBracket,
  BinanceRawFuturesPosition,
  BinanceRawFuturesSymbolBracket
} from "gv-api-web";
import {
  Account,
  ExtentedBinanceRawBinanceBalance,
  FuturesPositionInformation,
  LeverageBracket,
  SymbolLeverageBrackets
} from "pages/trade/binance-trade-page/trading/terminal.types";

export const mapBinanceRawFuturesAccountInfoToAccount = ({
  canDeposit,
  canTrade,
  canWithdraw,
  updateTime,
  assets,
  positions
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
  balances: assets.map(
    mapBinanceRawFuturesAccountAssetToBinanceRawBinanceBalance
  ),
  positions
});

export const mapBinanceRawFuturesAccountAssetToBinanceRawBinanceBalance = ({
  asset,
  availableBalance,
  maintMargin,
  marginBalance
}: BinanceRawFuturesAccountAsset): ExtentedBinanceRawBinanceBalance => ({
  asset,
  free: availableBalance,
  locked: 0,
  total: 0,
  amountInCurrency: 0,
  maintMargin,
  marginBalance
});

export const mapBinanceRawFuturesSymbolBracketToSymbolLeverageBrackets = ({
  symbolOrPair,
  brackets
}: BinanceRawFuturesSymbolBracket): SymbolLeverageBrackets => ({
  symbol: symbolOrPair,
  brackets: brackets.map(mapBinanceRawFuturesBracketToLeverageBracket)
});

export const mapBinanceRawFuturesBracketToLeverageBracket = ({
  bracket,
  initialLeverage,
  cap,
  floor,
  maintenanceMarginRatio
}: BinanceRawFuturesBracket): LeverageBracket => ({
  bracket,
  initialLeverage,
  notionalCap: cap,
  notionalFloor: floor,
  maintMarginRatio: maintenanceMarginRatio
});

export const mapBinanceRawFuturesPositionToFuturesPositionInformation = ({
  entryPrice,
  marginType,
  isAutoAddMargin,
  isolatedMargin,
  leverage,
  liquidationPrice,
  markPrice,
  maxNotionalValue,
  quantity,
  symbol,
  unrealizedPnL,
  positionSide
}: BinanceRawFuturesPosition): FuturesPositionInformation => ({
  entryPrice,
  marginType,
  isAutoAddMargin,
  isolatedMargin,
  leverage,
  liquidationPrice,
  markPrice,
  maxNotionalValue: +maxNotionalValue,
  positionAmt: quantity,
  symbol,
  unRealizedProfit: unrealizedPnL,
  positionSide
});
