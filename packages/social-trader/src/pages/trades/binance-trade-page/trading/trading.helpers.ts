import { ColoredTextColor } from "components/colored-text/colored-text";
import { getDividerParts } from "pages/trades/binance-trade-page/trading/order-book/order-book.helpers";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import { formatValue } from "utils/formatter";

export const DEFAULT_SYMBOL: SymbolState = {
  baseAsset: "BTC",
  quoteAsset: "USDT"
};

export const parseSymbolFromUrlParam = (param: string): SymbolState => {
  const splittedValue = param.split("_");
  return splittedValue.length > 1
    ? { baseAsset: splittedValue[0], quoteAsset: splittedValue[1] }
    : DEFAULT_SYMBOL;
};

export const getTextColor = (value: number): ColoredTextColor | undefined => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return;
};

export const getSymbolFromState = ({
  quoteAsset,
  baseAsset
}: SymbolState): string => baseAsset + quoteAsset;

export const getSymbol = (base: TradeCurrency, quote: TradeCurrency): string =>
  base + quote;

export const formatValueWithTick = (value: any, tick: string): string => {
  const decimalScale = getDividerParts(formatValue(tick)).fracLength;
  return formatValue(value, decimalScale);
};
