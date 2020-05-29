import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TFunction } from "i18next";
import {
  terminalMoneyFormat,
  truncated
} from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  getDecimalScale,
  getSymbol,
  getSymbolFilters
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  AssetBalance,
  ExchangeInfo,
  OrderSide,
  SymbolFilter,
  SymbolLotSizeFilter,
  SymbolMinNotionalFilter,
  SymbolPriceFilter,
  TimeInForce,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { useContext, useEffect, useMemo, useState } from "react";
import { NumberFormatValues } from "react-number-format";
import { calculatePercentage } from "utils/currency-converter";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { postponeFunc } from "utils/hook-form.helpers";
import { AnyObjectType } from "utils/types";
import { minMaxNumberShape } from "utils/validators/validators";
import { lazy, number, object } from "yup";

type PlaceOrderFormSetValueType = (
  name: string,
  value?: number,
  shouldValidate?: boolean
) => void;

export enum TRADE_FORM_FIELDS {
  timeInForce = "timeInForce",
  stopPrice = "stopPrice",
  price = "price",
  quantity = "quantity",
  total = "total"
}

export interface IPlaceOrderDefaultFormValues {
  [TRADE_FORM_FIELDS.timeInForce]?: TimeInForce;
  [TRADE_FORM_FIELDS.quantity]: number;
  [TRADE_FORM_FIELDS.total]: number;
  [TRADE_FORM_FIELDS.price]: number;
}

export interface IStopLimitFormValues extends IPlaceOrderDefaultFormValues {
  [TRADE_FORM_FIELDS.stopPrice]: number;
}

export interface IPlaceOrderFormValues extends IPlaceOrderDefaultFormValues {}

export const RANGE_MARKS = ["0%", "25%", "50%", "75%", "100%"];

export const usePlaceOrderAutoFill = ({
  setValue,
  total,
  price,
  stepSize,
  quantity,
  tickSize,
  totalName,
  quantityName
}: {
  total: number;
  price: number;
  quantity: number;
  tickSize: string;
  stepSize: string;
  setValue: PlaceOrderFormSetValueType;
  totalName: string;
  quantityName: string;
}) => {
  const [autoFill, setAutoFill] = useState<boolean>(false);
  useEffect(() => {
    if (!autoFill) {
      const value = +terminalMoneyFormat({
        amount: total / price,
        tickSize: stepSize
      });
      if (isNaN(value)) return;
      if (value > 0 || String(total) === "0") {
        setValue(quantityName, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [total]);
  useEffect(() => {
    if (!autoFill) {
      const value = +terminalMoneyFormat({
        amount: quantity * price,
        tickSize: tickSize
      });
      if (isNaN(value)) return;
      if (value > 0 || String(quantity) === "0")
        setValue(totalName, value, true);
      setAutoFill(true);
    } else setAutoFill(false);
  }, [quantity]);
  useEffect(() => {
    if (!autoFill) {
      if (quantity && price) {
        const value = +terminalMoneyFormat({
          amount: quantity * price,
          tickSize: tickSize
        });
        if (isNaN(value)) return;
        setValue(totalName, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [price]);
};

export const usePlaceOrderFormReset = ({
  status,
  triggerValidation,
  stepSize,
  outerPrice,
  reset,
  watch,
  setValue,
  side,
  baseAsset,
  quoteAsset,
  balances,
  totalName,
  quantityName
}: {
  status: API_REQUEST_STATUS;
  triggerValidation: VoidFunction;
  stepSize: string;
  watch: () => AnyObjectType;
  reset: (values: any) => void;
  outerPrice: number;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  balances: AssetBalance[];
  totalName: string;
  quantityName: string;
}) => {
  const { terminalType } = useContext(TradingInfoContext);
  const { quantity, total } = watch();
  const { sliderValue, setSliderValue } = useTradeSlider({
    watch,
    stepSize,
    baseAsset,
    quoteAsset,
    side,
    setValue,
    balances,
    quantityName,
    totalName
  });
  const [isReset, setReset] = useState<boolean | undefined>();

  useEffect(() => {
    if (status === API_REQUEST_STATUS.SUCCESS)
      postponeFunc(() => setReset(true));
  }, [status]);

  useEffect(() => {
    if (isReset) {
      reset(watch());
      setReset(false);
    }
    if (isReset === false) triggerValidation();
  }, [isReset]);

  useEffect(() => {
    reset({
      timeInForce: watch().timeInForce,
      stopPrice: outerPrice,
      price: outerPrice,
      quantity,
      total
    });
  }, [terminalType, outerPrice]);

  const [prevFormState, setPrevFormState] = useState<
    (AnyObjectType & { sliderValue?: number }) | undefined
  >();

  useEffect(() => {
    setPrevFormState({ ...watch(), sliderValue });
    if (prevFormState) {
      setSliderValue(prevFormState.sliderValue);
      reset(prevFormState);
    }
  }, [side]);
  return { sliderValue, setSliderValue };
};

export const usePlaceOrderInfo = ({
  exchangeInfo,
  baseAsset,
  quoteAsset,
  balances,
  side
}: {
  exchangeInfo: ExchangeInfo;
  side: OrderSide;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  balances: AssetBalance[];
}) => {
  const filters = getSymbolFilters(
    exchangeInfo,
    getSymbol(baseAsset, quoteAsset)
  );
  const { minPrice, maxPrice, tickSize } = getSymbolPriceFilter(filters);
  const { minQty, maxQty, stepSize } = getLotSizeFilter(filters);
  const { minNotional } = getMinNotionalFilter(filters);

  const maxQuantityWithWallet = useMemo(() => {
    return side === "BUY"
      ? +maxQty
      : Math.min(+maxQty, +getBalance(balances, baseAsset));
  }, [side, maxQty, balances, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "BUY"
      ? +getBalance(balances, quoteAsset)
      : Number.MAX_SAFE_INTEGER;
  }, [side, balances, quoteAsset]);
  return {
    minPrice,
    maxPrice,
    tickSize,
    minQty,
    stepSize,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  };
};

export const useTradeSlider = ({
  watch,
  stepSize,
  setValue,
  side,
  balances,
  quoteAsset,
  baseAsset,
  totalName,
  quantityName
}: {
  watch: () => AnyObjectType;
  stepSize: string;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  balances: AssetBalance[];
  totalName: string;
  quantityName: string;
}) => {
  const [sliderValue, setSliderValue] = useState<number | undefined>();
  useEffect(() => {
    if (sliderValue === undefined) return;
    const percentValue = parseInt(RANGE_MARKS[sliderValue]);
    if (side === "BUY") {
      const { price } = watch();
      const walletAvailable = +getBalance(balances, quoteAsset);
      const fullTotal = calculatePercentage(walletAvailable, percentValue);
      const newAmount = +terminalMoneyFormat({
        amount: fullTotal / price,
        tickSize: stepSize
      });
      const newTotal = +formatValue(newAmount * price, 8);
      setValue(totalName, newTotal, true);
    }
    if (side === "SELL") {
      const walletAvailable = +getBalance(balances, baseAsset);
      const percentAmount = calculatePercentage(walletAvailable, percentValue);
      if (
        truncated(percentAmount, getDecimalScale(formatValue(stepSize))) === 0
      )
        return;
      const newQuantity = +terminalMoneyFormat({
        amount: percentAmount,
        tickSize: stepSize
      });
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

const placeOrderTotalShape = ({
  t,
  maxTotal,
  minNotional,
  quoteAsset,
  maxQuantity
}: {
  t: TFunction;
  quoteAsset: TradeCurrency;
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
  lazy((values: IStopLimitFormValues) => {
    const minPriceValue =
      side === "BUY"
        ? Math.max(minPrice, values[TRADE_FORM_FIELDS.stopPrice])
        : minPrice;
    const maxPriceValue =
      side === "SELL"
        ? Math.min(maxPrice, values[TRADE_FORM_FIELDS.stopPrice])
        : maxPrice;
    return object().shape({
      [TRADE_FORM_FIELDS.stopPrice]: tradeNumberShape({
        t,
        min: minPrice,
        max: maxPrice,
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
    });
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
