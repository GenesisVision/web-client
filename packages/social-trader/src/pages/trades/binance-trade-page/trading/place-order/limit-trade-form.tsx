import { isAllow } from "components/deposit/components/deposit.helpers";
import { DialogButtons } from "components/dialog/dialog-buttons";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Slider } from "components/range/range";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { formatValueWithTick } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Account,
  ExchangeInfo,
  OrderSide,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import {
  ILimitTradeFormValues,
  LIMIT_FORM_FIELDS,
  limitValidationSchema,
  RANGE_MARKS,
  usePlaceOrderInfo,
  useTradeSlider
} from "./place-order.helpers";

export interface ILimitTradeFormProps {
  outerPrice: number;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  direction: OrderSide;
  onSubmit: (values: ILimitTradeFormValues) => any;
}

const _LimitTradeForm: React.FC<ILimitTradeFormProps & {
  accountInfo: Account;
  exchangeInfo: ExchangeInfo;
}> = ({
  accountInfo,
  exchangeInfo,
  outerPrice,
  onSubmit,
  quoteAsset,
  baseAsset,
  direction
}) => {
  const [t] = useTranslation();
  const [autoFill, setAutoFill] = useState<boolean>(false);

  const {
    minPrice,
    maxPrice,
    tickSize,
    minQty,
    stepSize,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  } = usePlaceOrderInfo({
    balances: accountInfo.balances,
    side: direction,
    quoteAsset,
    baseAsset,
    exchangeInfo
  });

  const form = useForm<ILimitTradeFormValues>({
    validationSchema: limitValidationSchema({
      t,
      quoteAsset,
      baseAsset,
      stepSize: +stepSize,
      tickSize: +tickSize,
      maxTotal: maxTotalWithWallet,
      maxPrice: +maxPrice,
      minPrice: +minPrice,
      maxQuantity: maxQuantityWithWallet,
      minQuantity: +minQty,
      minNotional: +minNotional
    }),
    defaultValues: { price: outerPrice },
    mode: "onChange"
  });
  const { watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  useEffect(() => {
    reset({ price: outerPrice, quantity, total });
  }, [outerPrice]);

  const { sliderValue, setSliderValue } = useTradeSlider({
    baseAsset,
    quoteAsset,
    side: direction,
    setValue,
    balances: accountInfo.balances,
    quantityName: LIMIT_FORM_FIELDS.quantity,
    totalName: LIMIT_FORM_FIELDS.total
  });

  const [prevFormState, setPrevFormState] = useState<
    (ILimitTradeFormValues & { sliderValue: number }) | undefined
  >();

  useEffect(() => {
    setPrevFormState({ ...watch(), sliderValue });
    if (prevFormState) {
      reset(prevFormState);
      setSliderValue(prevFormState.sliderValue);
    }
  }, [direction]);

  useEffect(() => {
    if (!autoFill) {
      const value = (formatValueWithTick(
        total / price,
        stepSize
      ) as unknown) as number;
      if (value > 0) {
        setValue(LIMIT_FORM_FIELDS.quantity, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [total]);
  useEffect(() => {
    if (!autoFill) {
      const value = (formatValueWithTick(
        quantity * price,
        tickSize
      ) as unknown) as number;
      if (value > 0) {
        setValue(LIMIT_FORM_FIELDS.total, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [quantity]);
  useEffect(() => {
    if (!autoFill) {
      if (quantity) {
        setValue(
          LIMIT_FORM_FIELDS.total,
          (formatValueWithTick(
            quantity * price,
            tickSize
          ) as unknown) as number,
          true
        );
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [price]);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row>
        <HookFormAmountField
          label={t("Price")}
          currency={quoteAsset}
          name={LIMIT_FORM_FIELDS.price}
        />
      </Row>
      <Row>
        <HookFormAmountField
          label={t("Amount")}
          currency={baseAsset}
          name={LIMIT_FORM_FIELDS.quantity}
        />
      </Row>
      <Row wide onlyOffset>
        <Slider
          dots
          min={0}
          max={RANGE_MARKS.length - 1}
          marks={RANGE_MARKS}
          value={sliderValue}
          onChange={setSliderValue}
        />
      </Row>
      <Row>
        <HookFormAmountField
          isAllowed={isAllow("BTC")}
          label={t("Total")}
          currency={quoteAsset}
          name={LIMIT_FORM_FIELDS.total}
        />
      </Row>
      <DialogButtons>
        <SubmitButton color={direction === "SELL" ? "danger" : "primary"} wide>
          <>
            {direction} {baseAsset}
          </>
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

export const LimitTradeForm = React.memo(_LimitTradeForm);
