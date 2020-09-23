import { getDecimalScale } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { formatValue } from "utils/formatter";

export const truncated = (num: number, decimalPlaces: number) => {
  let numPowerConverter = Math.pow(10, decimalPlaces);
  return ~~(num * numPowerConverter) / numPowerConverter;
};

export const terminalMoneyFormat = ({
  tickSize,
  digits = 2,
  amount
}: {
  amount: number | string;
  digits?: number;
  tickSize?: string;
  currency?: string;
}): string => {
  const decimalScale = tickSize
    ? getDecimalScale(formatValue(tickSize))
    : undefined;
  return (+amount).toFixed(decimalScale || digits);
};
