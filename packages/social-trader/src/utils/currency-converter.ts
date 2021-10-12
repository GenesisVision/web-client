export const convertFromCurrency = (
  value: string | number,
  rate: string | number
): number => {
  if (typeof value === "string") value = parseFloat(value);
  if (typeof rate === "string") rate = parseFloat(rate);
  return value * rate;
};

export const convertToCurrency = (value: number = 0, rate: number): number =>
  value / rate;

export const calculatePercentage = (value: number = 0, percentage: number) =>
  (value * percentage) / 100;

export const CURRENCY_FRACTIONS = (currency: string): number => {
  switch (currency) {
    case "BTC":
    case "ETH":
    case "Any":
      return 8;
    case "USD":
    case "EUR":
      return 2;
    default:
      return 4;
  }
};

export const checkCurrencyValue = (value: number, currency: string): number =>
  Math.abs(value) < Math.pow(10, -CURRENCY_FRACTIONS(currency)) ? 0 : value;
