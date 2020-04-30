import { TFunction } from "i18next";
import {
  AssetBalance,
  OrderSide,
  SymbolFilter,
  SymbolLotSizeFilter,
  SymbolMinNotionalFilter,
  SymbolPriceFilter,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { useEffect, useState } from "react";
import { NumberFormatValues } from "react-number-format";
import { calculatePercentage } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { modulo, safeGetElemFromArray } from "utils/helpers";
import { minMaxNumberShape } from "utils/validators/validators";
import { number, object } from "yup";

export const RANGE_MARKS = ["0%", "25%", "50%", "75%", "100%"];

export enum LIMIT_FORM_FIELDS {
  price = "price",
  quantity = "quantity",
  total = "total"
}

export interface ILimitTradeFormValues {
  [LIMIT_FORM_FIELDS.price]: number;
  [LIMIT_FORM_FIELDS.quantity]: number;
  [LIMIT_FORM_FIELDS.total]: number;
}

export const useTradeSlider = ({
  setValue,
  side,
  balances,
  quoteAsset,
  baseAsset,
  totalName,
  quantityName
}: {
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  balances: AssetBalance[];
  totalName: string;
  quantityName: string;
}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  useEffect(() => {
    const percentValue = parseInt(RANGE_MARKS[sliderValue]);
    if (side === "BUY") {
      const walletAvailable = +getBalance(balances, quoteAsset);
      const newTotal = calculatePercentage(walletAvailable, percentValue);
      setValue(totalName, newTotal, true);
    }
    if (side === "SELL") {
      const walletAvailable = +getBalance(balances, baseAsset);
      const newQuantity = calculatePercentage(walletAvailable, percentValue);
      setValue(quantityName, newQuantity, true);
    }
  }, [sliderValue]);
  return { sliderValue, setSliderValue };
};

export const getBalance = (balances: AssetBalance[], currency: TradeCurrency) =>
  safeGetElemFromArray(balances, ({ asset }) => asset === currency).free;

export const getMinNotionalFilter = (filters: SymbolFilter[]) =>
  safeGetElemFromArray(
    filters,
    ({ filterType }) => filterType === "MIN_NOTIONAL"
  ) as SymbolMinNotionalFilter;

export const getSymbolPriceFilter = (filters: SymbolFilter[]) =>
  safeGetElemFromArray(
    filters,
    ({ filterType }) => filterType === "PRICE_FILTER"
  ) as SymbolPriceFilter;

export const getLotSizeFilter = (filters: SymbolFilter[]) =>
  safeGetElemFromArray(
    filters,
    ({ filterType }) => filterType === "LOT_SIZE"
  ) as SymbolLotSizeFilter;

const defaultAllows = ({
  floatValue,
  formattedValue,
  value
}: NumberFormatValues): boolean => {
  return (
    (formattedValue === "" || formattedValue === "0." || floatValue === 0) &&
    value !== "."
  );
};

export const isTickSizeAllow = (min: number, tick: number) => ({
  floatValue
}: NumberFormatValues): boolean => {
  return (floatValue - min) % tick === 0;
};

export const isMinMaxAllow = (min: number, max: number) => ({
  floatValue
}: NumberFormatValues): boolean => {
  return floatValue >= min && floatValue <= max;
};

export const isTradeFieldAllow = (min: number, max: number, tick: number) => (
  values: NumberFormatValues
): boolean => {
  return (
    defaultAllows(values) ||
    (isTickSizeAllow(min, tick)(values) && isMinMaxAllow(min, max)(values))
  );
};

const tradeNumberShape = ({
  t,
  min,
  max,
  currency,
  divider
}: {
  t: TFunction;
  min: number;
  max: number;
  currency: TradeCurrency;
  divider: number;
}) =>
  minMaxNumberShape({
    t,
    min,
    max
  }).test({
    message: `Must be multiply of ${divider}`,
    test: value => true //modulo(value, divider) === 0
  });

export const limitValidationSchema = ({
  t,
  baseAsset,
  quoteAsset,
  stepSize,
  tickSize,
  maxTotal,
  maxPrice,
  minPrice,
  maxQuantity,
  minQuantity,
  minNotional
}: {
  t: TFunction;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  stepSize: number;
  tickSize: number;
  maxTotal: number;
  maxPrice: number;
  minPrice: number;
  maxQuantity: number;
  minQuantity: number;
  minNotional: number;
}) =>
  object().shape({
    [LIMIT_FORM_FIELDS.price]: tradeNumberShape({
      t,
      min: minPrice,
      max: maxPrice,
      divider: tickSize,
      currency: quoteAsset
    }),
    [LIMIT_FORM_FIELDS.quantity]: tradeNumberShape({
      t,
      min: minQuantity,
      max: maxQuantity,
      divider: stepSize,
      currency: baseAsset
    }),
    [LIMIT_FORM_FIELDS.total]: number()
      .min(
        minNotional,
        t(
          `Must be more or equal than ${formatCurrencyValue(
            minNotional,
            quoteAsset
          )}`,
          { minNotional }
        )
      )
      .max(
        maxTotal,
        t(
          `Must be less or equal than ${formatCurrencyValue(
            maxTotal,
            quoteAsset
          )}`,
          { maxQuantity }
        )
      )
  });
