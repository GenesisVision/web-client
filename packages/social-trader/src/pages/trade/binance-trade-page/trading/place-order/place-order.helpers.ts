import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TFunction } from "i18next";
import {
  terminalMoneyFormat,
  truncated
} from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/terminal-place-order.context";
import {
  getDecimalScale,
  getSymbol,
  getSymbolFilters
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  AssetBalance,
  ExchangeInfo,
  OrderSide,
  SymbolFilter,
  SymbolLotSizeFilter,
  SymbolMinNotionalFilter,
  SymbolPriceFilter,
  TerminalCurrency,
  TimeInForce
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useMemo, useState } from "react";
import { NumberFormatValues } from "react-number-format";
import { calculatePercentage } from "utils/currency-converter";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { safeGetElemFromArray, tableLoaderCreator } from "utils/helpers";
import { postponeFunc } from "utils/hook-form.helpers";
import { AnyObjectType } from "utils/types";
import { minMaxNumberShape } from "utils/validators/validators";
import { lazy, number, object, Schema } from "yup";

type PlaceOrderFormSetValueType = (
  name: string,
  value?: number,
  shouldValidate?: boolean
) => void;

export enum TRADE_FORM_FIELDS {
  reduceOnly = "reduceOnly",
  timeInForce = "timeInForce",
  stopPrice = "stopPrice",
  price = "price",
  quantity = "quantity",
  total = "total"
}

export interface IPlaceOrderDefaultFormValues {
  [TRADE_FORM_FIELDS.reduceOnly]?: boolean;
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

export const getBalanceLoaderData = (
  asset: string = "BTC"
) => (): AssetBalance => ({
  asset,
  free: "0",
  locked: "0"
});

export const getBalancesLoaderData = (asset: string) =>
  tableLoaderCreator(getBalanceLoaderData(asset), 1);

export const usePlaceOrderAutoFill = ({
  setValue,
  total,
  price,
  quantity,
  totalName,
  quantityName
}: {
  total: number;
  price: number;
  quantity: number;
  setValue: PlaceOrderFormSetValueType;
  totalName: string;
  quantityName: string;
}) => {
  const { stepSize, tickSize } = useContext(TerminalInfoContext);
  const { leverage } = useContext(TerminalPlaceOrderContext);
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
        amount: leverage * quantity * price,
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
          amount: leverage * quantity * price,
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
  outerPrice,
  reset,
  watch,
  setValue,
  side,
  balances,
  quantityName
}: {
  status: API_REQUEST_STATUS;
  triggerValidation: VoidFunction;
  watch: () => AnyObjectType;
  reset: (values: any) => void;
  outerPrice: number;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  balances: AssetBalance[];
  quantityName: string;
}) => {
  const { terminalType, symbol } = useContext(TerminalInfoContext);
  const { quantity, total, price } = watch();
  const { sliderValue, setSliderValue } = useTradeSlider({
    watch,
    side,
    setValue,
    balances,
    quantityName
  });
  const [isReset, setReset] = useState<boolean | undefined>();
  const [prevFormState, setPrevFormState] = useState<
    (AnyObjectType & { sliderValue?: number }) | undefined
  >();

  useEffect(() => {
    if (status === "SUCCESS") postponeFunc(() => setReset(true));
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
  }, [outerPrice]);

  useEffect(() => {
    setSliderValue(0);
    reset({
      timeInForce: watch().timeInForce,
      stopPrice: outerPrice,
      price: outerPrice
    });
  }, [symbol, terminalType]);

  useEffect(() => {
    setPrevFormState({ ...watch(), sliderValue });
    if (prevFormState) {
      setSliderValue(prevFormState.sliderValue);
      reset({ ...prevFormState, price });
    }
  }, [side]);
  return { sliderValue, setSliderValue };
};

export const usePlaceOrderInfo = ({
  exchangeInfo,
  balances,
  side
}: {
  exchangeInfo: ExchangeInfo;
  side: OrderSide;
  balances: AssetBalance[];
}) => {
  const {
    symbol: { baseAsset, quoteAsset },
    terminalType
  } = useContext(TerminalInfoContext);
  const filters = getSymbolFilters(
    exchangeInfo,
    getSymbol(baseAsset, quoteAsset)
  );
  const { minPrice, maxPrice } = getSymbolPriceFilter(filters);
  const { minQty, maxQty } = getLotSizeFilter(filters);
  const { minNotional } = getMinNotionalFilter(filters);

  const maxQuantityWithWallet = useMemo(() => {
    return side === "BUY"
      ? +maxQty
      : Math.min(
          +maxQty,
          +getBalance(
            balances,
            terminalType === "futures" ? quoteAsset : baseAsset
          )
        );
  }, [side, maxQty, balances, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "BUY"
      ? +getBalance(balances, quoteAsset)
      : Number.MAX_SAFE_INTEGER;
  }, [side, balances, quoteAsset]);
  return {
    minPrice,
    maxPrice,
    minQty,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  };
};

export const useTradeSlider = ({
  watch,
  setValue,
  side,
  balances,
  quantityName
}: {
  watch: () => AnyObjectType;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  balances: AssetBalance[];
  quantityName: string;
}) => {
  const {
    symbol: { quoteAsset, baseAsset },
    stepSize,
    terminalType
  } = useContext(TerminalInfoContext);
  const [sliderValue, setSliderValue] = useState<number | undefined>();
  useEffect(() => {
    if (sliderValue === undefined) return;
    const percentValue = parseInt(RANGE_MARKS[sliderValue]);
    if (side === "BUY") {
      const { price } = watch();
      const walletAvailable = +getBalance(balances, quoteAsset);
      const fullTotal = calculatePercentage(walletAvailable, percentValue);
      const newAmount = truncated(
        fullTotal / price,
        getDecimalScale(formatValue(stepSize))
      );
      setValue(quantityName, newAmount, true);
    }
    if (side === "SELL") {
      const walletAvailable = +getBalance(
        balances,
        terminalType === "futures" ? quoteAsset : baseAsset
      );
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

export const getBalance = (
  balances: AssetBalance[],
  currency: TerminalCurrency
) => safeGetElemFromArray(balances, ({ asset }) => asset === currency).free;

export const getMinNotionalFilter = (filters: SymbolFilter[]) => {
  return (filters.find(({ filterType }) => filterType === "MIN_NOTIONAL") || {
    applyToMarket: false,
    avgPriceMins: 0,
    filterType: "MIN_NOTIONAL",
    minNotional: 0
  }) as SymbolMinNotionalFilter;
};

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
