import { TFunction } from "i18next";
import {
  IStopLimitFormValues,
  TRADE_FORM_FIELDS
} from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import {
  OrderSide,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { formatCurrencyValue } from "utils/formatter";
import { minMaxNumberShape } from "utils/validators/validators";
import { lazy, number, object, Schema } from "yup";

const placeOrderTotalShape = ({
  t,
  maxTotal,
  minNotional,
  quoteAsset,
  maxQuantity
}: {
  t: TFunction;
  quoteAsset: TerminalCurrency;
  maxTotal: number;
  maxQuantity: number;
  minNotional: number;
}) =>
  number()
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
    );

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
  currency: TerminalCurrency;
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

export const placeOrderStopLimitValidationSchema = ({
  side,
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
  side: OrderSide;
  t: TFunction;
  baseAsset: TerminalCurrency;
  quoteAsset: TerminalCurrency;
  stepSize: number;
  tickSize: number;
  maxTotal: number;
  maxPrice: number;
  minPrice: number;
  maxQuantity: number;
  minQuantity: number;
  minNotional: number;
}) =>
  lazy<IStopLimitFormValues>(values => {
    const minPriceValue =
      side === "Buy"
        ? minPrice //Math.max(minPrice, values[TRADE_FORM_FIELDS.stopPrice])
        : minPrice;
    const maxPriceValue =
      side === "Sell"
        ? maxPrice // Math.min(maxPrice, values[TRADE_FORM_FIELDS.stopPrice])
        : maxPrice;
    return object().shape({
      [TRADE_FORM_FIELDS.stopPrice]: tradeNumberShape({
        t,
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        divider: tickSize,
        currency: quoteAsset
      }),
      [TRADE_FORM_FIELDS.price]: tradeNumberShape({
        t,
        min: minPriceValue,
        max: maxPriceValue,
        divider: tickSize,
        currency: quoteAsset
      }),
      [TRADE_FORM_FIELDS.quantity]: tradeNumberShape({
        t,
        min: minQuantity,
        max: maxQuantity,
        divider: stepSize,
        currency: baseAsset
      }),
      [TRADE_FORM_FIELDS.total]: placeOrderTotalShape({
        t,
        maxTotal,
        minNotional,
        quoteAsset,
        maxQuantity
      })
    }) as Schema<IStopLimitFormValues>;
  });

export const placeOrderDefaultValidationSchema = ({
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
  baseAsset: TerminalCurrency;
  quoteAsset: TerminalCurrency;
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
    [TRADE_FORM_FIELDS.price]: tradeNumberShape({
      t,
      min: minPrice,
      max: maxPrice,
      divider: tickSize,
      currency: quoteAsset
    }),
    [TRADE_FORM_FIELDS.quantity]: tradeNumberShape({
      t,
      min: minQuantity,
      max: maxQuantity,
      divider: stepSize,
      currency: baseAsset
    }),
    [TRADE_FORM_FIELDS.total]: placeOrderTotalShape({
      t,
      maxTotal,
      minNotional,
      quoteAsset,
      maxQuantity
    })
  });
