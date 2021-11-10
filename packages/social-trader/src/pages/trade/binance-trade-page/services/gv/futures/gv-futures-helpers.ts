import {
  BinanceRawFuturesAccountAsset,
  BinanceRawFuturesAccountInfo,
  BinanceRawFuturesBracket,
  BinanceRawFuturesSymbolBracket
} from "gv-api-web";
import {
  Account,
  ExtentedBinanceRawBinanceBalance,
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
  balances: assets,
  // balances: assets.map(
  //   mapBinanceRawFuturesAccountAssetToBinanceRawBinanceBalance
  // ),
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
