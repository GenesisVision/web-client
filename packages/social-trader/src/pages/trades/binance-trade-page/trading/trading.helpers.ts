import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";

export const getSymbol = (base: TradeCurrency, quote: TradeCurrency): string =>
  base + quote;
