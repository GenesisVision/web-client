import { ColoredTextColor } from "components/colored-text/colored-text";
import { FuturesAsset } from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import {
  AssetBalance,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { safeGetElemFromArray } from "utils/helpers";

export const MARGIN_INFO_ASSET = "USDT";

export const getMarginRatioLoaderData = (): FuturesAsset => ({
  asset: "BTCUSDT",
  initialMargin: "0",
  maintMargin: "0",
  marginBalance: "0",
  maxWithdrawAmount: "0",
  openOrderInitialMargin: "0",
  positionInitialMargin: "0",
  unrealizedProfit: "0",
  walletBalance: "0"
});

export const getMarginInfo = (
  balances: AssetBalance[],
  currency: TradeCurrency
): FuturesAsset =>
  safeGetElemFromArray(balances, ({ asset }) => asset === currency)
    .futuresAsset as FuturesAsset;

export const getMarginRatioColor = (ratio: number): ColoredTextColor => {
  if (ratio <= 50) return "green";
  if (ratio <= 70) return "yellow";
  return "red";
};
