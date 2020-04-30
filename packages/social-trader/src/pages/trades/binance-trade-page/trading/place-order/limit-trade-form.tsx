import { isAllow } from "components/deposit/components/deposit.helpers";
import { DialogButtons } from "components/dialog/dialog-buttons";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Slider } from "components/range/range";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  Account,
  ExchangeInfo,
  OrderSide,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import {
  ILimitTradeFormValues,
  LIMIT_FORM_FIELDS,
  limitValidationSchema,
  RANGE_MARKS,
  usePlaceOrderAutoFill,
  usePlaceOrderFormReset,
  usePlaceOrderInfo
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

  const { sliderValue, setSliderValue } = usePlaceOrderFormReset({
    outerPrice,
    watch,
    reset,
    baseAsset,
    quoteAsset,
    side: direction,
    setValue,
    balances: accountInfo.balances,
    quantityName: LIMIT_FORM_FIELDS.quantity,
    totalName: LIMIT_FORM_FIELDS.total
  });

  usePlaceOrderAutoFill({
    totalName: LIMIT_FORM_FIELDS.total,
    quantityName: LIMIT_FORM_FIELDS.quantity,
    setValue,
    tickSize,
    price,
    quantity,
    stepSize,
    total
  });

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
