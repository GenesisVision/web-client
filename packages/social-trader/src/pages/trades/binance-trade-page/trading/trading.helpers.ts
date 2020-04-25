import { ColoredTextColor } from "components/colored-text/colored-text";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";

export const getTextColor = (value: number): ColoredTextColor | undefined => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return;
};

export const getSymbol = (base: TradeCurrency, quote: TradeCurrency): string =>
  base + quote;
