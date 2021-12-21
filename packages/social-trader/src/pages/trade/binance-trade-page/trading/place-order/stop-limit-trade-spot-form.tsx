import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TotalField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/total-field";
import {
  TIME_IN_FORCE_VALUES,
  TimeInForceField
} from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/time-in-force-field/time-in-force-field";
import { PlaceOrderSlider } from "pages/trade/binance-trade-page/trading/place-order/place-order-slider";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import {
  OrderSide,
  OrderType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { minMaxNumberRules } from "utils/validators/validators";

import { SpotQuantityField } from "./forms/fields/spot-quantity-field";
import { SpotPriceField } from "./forms/spot-price-field";
import { usePlaceOrderAutoFill } from "./hooks/place-order-auto-fill.hook";
import { useSpotPlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { useSpotPlaceOrderInfo } from "./hooks/place-order-info-hook";
import {
  FilterValues,
  ISpotStopLimitFormValues,
  SPOT_TRADE_FORM_FIELDS
} from "./place-order.types";

export interface IStopLimitTradeFormProps {
  filterValues: FilterValues;
  status: API_REQUEST_STATUS;
  outerPrice: string;
  side: OrderSide;
  onSubmit: (values: ISpotStopLimitFormValues & { type: OrderType }) => any;
}

const _StopLimitTradeSpotForm: React.FC<
  IStopLimitTradeFormProps & {
    balanceBase: number;
    balanceQuote: number;
  }
> = ({
  filterValues,
  status,
  balanceQuote,
  balanceBase,
  outerPrice,
  onSubmit,
  side
}) => {
  const [t] = useTranslation();

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const {
    minPrice,
    maxPrice,
    minQuantity,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  } = useSpotPlaceOrderInfo({
    balanceBase,
    balanceQuote,
    side,
    filterValues
  });

  const form = useForm<ISpotStopLimitFormValues>({
    defaultValues: {
      [SPOT_TRADE_FORM_FIELDS.timeInForce]: TIME_IN_FORCE_VALUES[0].value,
      [SPOT_TRADE_FORM_FIELDS.stopPrice]: outerPrice,
      [SPOT_TRADE_FORM_FIELDS.price]: outerPrice
    },
    mode: "onChange"
  });
  const { triggerValidation, watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  const { sliderValue, setSliderValue } = useSpotPlaceOrderFormReset({
    status,
    triggerValidation,
    outerPrice,
    watch,
    reset,
    side,
    setValue,
    balanceBase,
    balanceQuote,
    quantityName: SPOT_TRADE_FORM_FIELDS.quantity
  });

  usePlaceOrderAutoFill({
    buyWalletAvailable: balanceQuote,
    sellWalletAvailable: balanceBase,
    setSliderValue,
    side,
    totalName: SPOT_TRADE_FORM_FIELDS.total,
    quantityName: SPOT_TRADE_FORM_FIELDS.quantity,
    setValue,
    price,
    quantity,
    total
  });

  return (
    <HookForm
      resetOnSuccess
      form={form}
      onSubmit={values => onSubmit({ ...values, type: "TakeProfitLimit" })}
    >
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Stop")}
          currency={quoteAsset}
          name={SPOT_TRADE_FORM_FIELDS.stopPrice}
          rules={minMaxNumberRules({
            t,
            min: 0,
            max: Number.MAX_SAFE_INTEGER
          })}
        />
      </Row>
      <Row>
        <SpotPriceField label={t("Limit")} min={minPrice} max={maxPrice} />
      </Row>
      <Row>
        <SpotQuantityField min={minQuantity} max={maxQuantityWithWallet} />
      </Row>
      <Row wide onlyOffset>
        <PlaceOrderSlider value={sliderValue} setValue={setSliderValue} />
      </Row>
      <Row size={"small"}>
        <TotalField max={maxTotalWithWallet} min={minNotional} />
      </Row>
      <Row>
        <PlaceOrderSubmitButton
          isSuccessful={status === "SUCCESS"}
          side={side}
          asset={baseAsset}
        />
      </Row>
      <Row size={"small"}>
        <RowItem wide>
          <TimeInForceField />
        </RowItem>
      </Row>
    </HookForm>
  );
};

export const StopLimitTradeSpotForm = React.memo(_StopLimitTradeSpotForm);
