import { TFunction } from "i18next";
import {
  OrderSide,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { minMaxNumberShape } from "utils/validators/validators";
import { object } from "yup";

import { TRADE_FORM_FIELDS } from "./place-order.types";

const tradeNumberShape = ({
  t,
  min,
  max,
  divider
}: {
  t: TFunction;
  min: number;
  max: number;
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
  object().shape({
    [TRADE_FORM_FIELDS.stopPrice]: tradeNumberShape({
      t,
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      divider: tickSize
    }),
    [TRADE_FORM_FIELDS.price]: tradeNumberShape({
      t,
      min: minPrice,
      max: maxPrice,
      divider: tickSize
    }),
    [TRADE_FORM_FIELDS.quantity]: tradeNumberShape({
      t,
      min: minQuantity,
      max: maxQuantity,
      divider: stepSize
    }),
    [TRADE_FORM_FIELDS.total]: minMaxNumberShape({
      t,
      max: maxTotal,
      min: minNotional
    })
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
      divider: tickSize
    }),
    [TRADE_FORM_FIELDS.quantity]: tradeNumberShape({
      t,
      min: minQuantity,
      max: maxQuantity,
      divider: stepSize
    }),
    [TRADE_FORM_FIELDS.total]: minMaxNumberShape({
      t,
      max: maxTotal,
      min: minNotional
    })
  });
