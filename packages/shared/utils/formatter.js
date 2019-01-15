import { CURRENCY_FRACTIONS, checkCurrencyValue } from "./currency-converter";

const reverseString = value =>
  String(value)
    .split("")
    .reverse()
    .join("");

const addOne = item =>
  item[1]
    ? [item[0], +item[1] === 0 ? item[1].slice(0, -1) + "1" : item[1]]
    : item;

const cleanNulls = item =>
  item[1] ? [item[0], reverseString(+reverseString(item[1]))] : item;

const sliceFraction = decimalScale => item => {
  if (decimalScale === 0) return [item[0]];
  if (decimalScale > 0) return [item[0], item[1].slice(0, decimalScale)];
  if (item[0] < 10) return [item[0], item[1].slice(0, 8)];
  if (item[0] < 100) return [item[0], item[1].slice(0, 6)];
  if (item[0] < 1000) return [item[0], item[1].slice(0, 4)];
  if (item[0] >= 1000) return [item[0], item[1].slice(0, 2)];
  return item;
};

const checkEmptyFraction = item => (item[1] ? item.join(".") : item[0]);

const formatValue = (value, decimalScale, abs) => {
  value = typeof value !== "number" ? +value : value;
  value = abs ? Math.abs(value) : value;
  if (value === undefined || isNaN(value) || value.toFixed(0) == value)
    return value;

  return [...[value.toFixed(10).split(".")]]
    .map(sliceFraction(decimalScale))
    .map(addOne)
    .map(cleanNulls)
    .map(checkEmptyFraction)
    .join();
};

const formatPercent = value => {
  if (value < 0.1 && value > -0.1) return 0;
  return formatValue(value, value > 1 || value < -1 ? 0 : 1);
};

const roundPercents = value => {
  const abs = Math.abs(value);
  const sign = Math.sign(value);
  const newValue = Math.max(abs, 0.01) * sign;
  const signString = abs < 0.01 && abs > 0 ? (sign < 0 ? ">" : "<") : "";
  return `${signString}${newValue}%`;
};

const validateFraction = (value, currency) => {
  const fraction = value.split(".")[1];
  return fraction ? fraction.length <= CURRENCY_FRACTIONS(currency) : true;
};

const formatCurrencyValue = (value, currency) =>
  formatValue(
    checkCurrencyValue(value, currency),
    CURRENCY_FRACTIONS(currency)
  );

export {
  formatValue,
  formatPercent,
  validateFraction,
  formatCurrencyValue,
  roundPercents
};
