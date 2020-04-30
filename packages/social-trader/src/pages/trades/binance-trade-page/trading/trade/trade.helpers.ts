import { TFunction } from "i18next";
import {
  AssetBalance,
  SymbolFilter,
  SymbolLotSizeFilter,
  SymbolMinNotionalFilter,
  SymbolPriceFilter,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { modulo, safeGetElemFromArray } from "utils/helpers";
import { number, object } from "yup";

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
    [LIMIT_FORM_FIELDS.price]: number()
      .required(t("Field is required"))
      .min(
        minPrice,
        t(
          `Must be more or equal than ${formatCurrencyValue(
            minPrice,
            quoteAsset
          )}`,
          { minPrice }
        )
      )
      .max(
        maxPrice,
        t(
          `Must be less or equal than ${formatCurrencyValue(
            maxPrice,
            quoteAsset
          )}`,
          { maxPrice }
        )
      )
      .test({
        message: `Must be multiply of ${tickSize}`,
        test: value => modulo(value, tickSize) === 0
      }),
    [LIMIT_FORM_FIELDS.quantity]: number()
      .required(t("Field is required"))
      .min(
        minQuantity,
        t(
          `Must be more or equal than ${formatCurrencyValue(
            minQuantity,
            baseAsset
          )}`,
          { minQuantity }
        )
      )
      .max(
        maxQuantity,
        t(
          `Must be less or equal than ${formatCurrencyValue(
            maxQuantity,
            baseAsset
          )}`,
          { maxQuantity }
        )
      )
      .test({
        message: `Must be multiply of ${stepSize}`,
        test: value => modulo(value, stepSize) === 0
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
