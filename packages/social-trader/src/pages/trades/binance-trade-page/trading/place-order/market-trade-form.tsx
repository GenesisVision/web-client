import { isAllow } from "components/deposit/components/deposit.helpers";
import FormError from "components/form/form-error/form-error";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { MutedText } from "components/muted-text/muted-text";
import { Slider } from "components/range/range";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { PlaceOrderSubmitButton } from "pages/trades/binance-trade-page/trading/place-order/place-order-submit-button";
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
  ITradeFormValues,
  limitValidationSchema,
  RANGE_MARKS,
  TRADE_FORM_FIELDS,
  usePlaceOrderAutoFill,
  usePlaceOrderFormReset,
  usePlaceOrderInfo
} from "./place-order.helpers";

export interface IMarketTradeFormProps {
  outerPrice: number;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  direction: OrderSide;
  onSubmit: (values: ITradeFormValues) => any;
}

const _MarketTradeForm: React.FC<IMarketTradeFormProps & {
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

  const form = useForm<ITradeFormValues>({
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
    mode: "onChange"
  });
  const { watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  const { sliderValue, setSliderValue } = usePlaceOrderFormReset({
    stepSize,
    outerPrice,
    watch,
    reset,
    baseAsset,
    quoteAsset,
    side: direction,
    setValue,
    balances: accountInfo.balances,
    quantityName: TRADE_FORM_FIELDS.quantity,
    totalName: TRADE_FORM_FIELDS.total
  });

  usePlaceOrderAutoFill({
    totalName: TRADE_FORM_FIELDS.total,
    quantityName: TRADE_FORM_FIELDS.quantity,
    setValue,
    tickSize,
    price,
    quantity,
    stepSize,
    total
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row hide>
        <HookFormAmountField
          autoFocus={false}
          label={t("Price")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.price}
        />
      </Row>
      <StatisticItemInner label={t("Price")}>
        {t("Market price")} <MutedText>(≈ {outerPrice})</MutedText>
      </StatisticItemInner>
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Amount")}
          currency={baseAsset}
          name={TRADE_FORM_FIELDS.quantity}
        />
      </Row>
      <Row>
        <HookFormAmountField
          disabled={true}
          externalDirty={true}
          autoFocus={false}
          isAllowed={isAllow("BTC")}
          label={t("Total")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.total}
        />
      </Row>
      {direction === "SELL" && (
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
      )}
      <PlaceOrderSubmitButton side={direction} asset={baseAsset} />
    </HookForm>
  );
};

export const MarketTradeForm = React.memo(_MarketTradeForm);
