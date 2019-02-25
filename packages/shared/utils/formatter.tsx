import { CURRENCY_FRACTIONS, checkCurrencyValue } from "./currency-converter";

const reverseString = (value: string | number): string =>
  String(value)
    .split("")
    .reverse()
    .join("");

const addOne = (item: string[]): string[] =>
  item[1]
    ? [item[0], +item[1] === 0 ? item[1].slice(0, -1) + "1" : item[1]]
    : item;

const cleanNulls = (item: string[]): string[] =>
  item[1] ? [item[0], reverseString(+reverseString(item[1]))] : item;

const sliceFraction = (decimalScale: number) => (item: string[]): string[] => {
  if (decimalScale === 0) return [item[0]];
  if (decimalScale > 0) return [item[0], item[1].slice(0, decimalScale)];
  if (+item[0] < 10) return [item[0], item[1].slice(0, 8)];
  if (+item[0] < 100) return [item[0], item[1].slice(0, 6)];
  if (+item[0] < 1000) return [item[0], item[1].slice(0, 4)];
  if (+item[0] >= 1000) return [item[0], item[1].slice(0, 2)];
  return item;
};

const checkEmptyFraction = (item: string[]): string =>
  item[1] ? item.join(".") : item[0];

const formatValue = (
  value: any,
  decimalScale?: number,
  abs?: boolean
): string => {
  value = typeof value !== "number" ? +value : value;
  value = abs ? Math.abs(value) : value;
  if (value === undefined || isNaN(value) || value.toFixed(0) == value)
    return String(value);

  return [...[value.toFixed(10).split(".")]]
    .map(sliceFraction(decimalScale || 0))
    .map(addOne)
    .map(cleanNulls)
    .map(checkEmptyFraction)
    .join();
};

const formatPercent = (value: number): string => {
  if (value < 0.1 && value > -0.1) return "0";
  return formatValue(value, value > 1 || value < -1 ? 0 : 1);
};

const roundPercents = (value: number): string => {
  const abs = Math.abs(value);
  const newValue = value === 0 ? 0 : formatValue(Math.max(abs, 0.01), 2);
  return `${value < 0.01 && value > 0 ? "<" : ""}${newValue}%`;
};

const validateFraction = (value: string, currency: string): boolean => {
  const fraction = value.split(".")[1];
  return fraction ? fraction.length <= CURRENCY_FRACTIONS(currency) : true;
};

const formatCurrencyValue = (
  value: number,
  currency: string,
  abs?: boolean
): string =>
  formatValue(
    checkCurrencyValue(value, currency),
    CURRENCY_FRACTIONS(currency),
    abs
  );

export {
  formatValue,
  formatPercent,
  validateFraction,
  formatCurrencyValue,
  roundPercents
};
