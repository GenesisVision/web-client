export const convertFromCurrency = (
  gvt: string | number,
  rate: string | number
): number => {
  if (typeof gvt === "string") gvt = parseFloat(gvt);
  if (typeof rate === "string") rate = parseFloat(rate);
  return gvt * rate;
};

export const convertToCurrency = (value: number = 0, rate: number): number =>
  value / rate;

export const calculateValueOfEntryFee = (
  value: number = 0,
  percentage: number
) => (value * percentage) / 100;

export const CURRENCY_FRACTIONS = (currency: string): number => {
  switch (currency) {
    case "BTC":
    case "ETH":
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
