import { ColoredTextColor } from "components/colored-text/colored-text";
import { FuturesAsset } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";

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

export const getMarginRatioColor = (ratio: number): ColoredTextColor => {
  if (ratio <= 50) return "green";
  if (ratio <= 70) return "yellow";
  return "red";
};
