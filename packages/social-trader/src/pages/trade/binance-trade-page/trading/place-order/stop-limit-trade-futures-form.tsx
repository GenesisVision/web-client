import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { PriceField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/price-field";
import { QuantityField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/quantity-field";
import { ReduceOnlyField } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import {
  TIME_IN_FORCE_VALUES,
  TimeInForceField
} from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/time-in-force-field/time-in-force-field";
import { PlaceOrderSlider } from "pages/trade/binance-trade-page/trading/place-order/place-order-slider";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import React, { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { minMaxNumberRules } from "utils/validators/validators";

import { getDecimalScale } from "../terminal.helpers";
import { useFuturesPlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { useFuturesPlaceOrderSlider } from "./hooks/place-order-futures-slider.hook";
import { useFuturesPlaceOrderInfo } from "./hooks/place-order-info-hook";
import { usePlaceOrderMaxCostValues } from "./hooks/place-order-max-cost-values.hook";
import {
  FilterValues,
  FUTURES_TRADE_FORM_FIELDS,
  FuturesPlaceOrderMode,
  IFuturesStopLimitFormValues,
  IFuturesStopLimitPlaceOrderHandleSubmitValues
} from "./place-order.types";
import {
  PlaceOrderMaxCostInfo,
  PlaceOrderSliderBuySellInfo
} from "./place-order-max-cost-info";

export interface IStopLimitTradeFormProps {
  balance: number;
  filterValues: FilterValues;
  placeOrderMode: FuturesPlaceOrderMode;
  outerPrice: string;
  status: API_REQUEST_STATUS;
  onSubmit: (values: IFuturesStopLimitPlaceOrderHandleSubmitValues) => any;
}

const _StopLimitTradeFuturesForm: React.FC<IStopLimitTradeFormProps> = ({
  balance,
  placeOrderMode,
  filterValues,
  outerPrice,
  onSubmit,
  status
}) => {
  const [t] = useTranslation();

  const {
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);
  const { currentPositionMode } = useContext(TerminalPlaceOrderContext);

  const {
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity
  } = useFuturesPlaceOrderInfo({
    filterValues
  });

  const form = useForm<IFuturesStopLimitFormValues>({
    defaultValues: {
      [FUTURES_TRADE_FORM_FIELDS.timeInForce]: TIME_IN_FORCE_VALUES[0].value,
      [FUTURES_TRADE_FORM_FIELDS.stopPrice]: outerPrice,
      [FUTURES_TRADE_FORM_FIELDS.price]: outerPrice
    },
    mode: "onChange"
  });
  const { triggerValidation, watch, setValue, reset } = form;
  const { quantity, price } = watch();

  useFuturesPlaceOrderFormReset({
    status,
    triggerValidation,
    outerPrice,
    watch,
    reset
  });

  const {
    sliderValue,
    setSliderValue,
    percentMode,
    setPercentMode
  } = useFuturesPlaceOrderSlider({
    setValue,
    quantityName: FUTURES_TRADE_FORM_FIELDS.quantity
  });

  const {
    longCost,
    shortCost,
    maxLong,
    maxShort,
    sliderBuy,
    sliderSell
  } = usePlaceOrderMaxCostValues({
    balance,
    orderPrice: price,
    quantity,
    percentMode
  });

  const handleSubmit = useCallback(
    values => {
      return onSubmit({ ...values, percentMode, sliderBuy, sliderSell });
    },
    [percentMode, sliderBuy, sliderSell]
  );

  return (
    <HookForm form={form}>
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Stop Price")}
          currency={quoteAsset}
          name={FUTURES_TRADE_FORM_FIELDS.stopPrice}
          tickSize={getDecimalScale(filterValues.tickSize)}
          rules={minMaxNumberRules({
            t,
            min: 0,
            max: Number.MAX_SAFE_INTEGER
          })}
        />
      </Row>
      <Row>
        <PriceField
          min={minPrice}
          max={maxPrice}
          tickSize={filterValues.tickSize}
        />
      </Row>
      <Row>
        <QuantityField
          percentMode={percentMode}
          stepSize={filterValues.stepSize}
          isAllowed={allowPositiveValuesNumberFormat(Number.MAX_SAFE_INTEGER)}
          setPercentMode={setPercentMode}
          setSliderValue={setSliderValue}
          min={minQuantity}
          max={maxQuantity}
        />
      </Row>
      <Row wide onlyOffset>
        <PlaceOrderSlider
          value={sliderValue}
          setValue={setSliderValue}
          setPercentMode={setPercentMode}
        />
      </Row>
      <PlaceOrderSliderBuySellInfo
        sliderBuy={sliderBuy}
        sliderSell={sliderSell}
      />
      <Row>
        <RowItem wide>
          <TimeInForceField />
        </RowItem>
        {currentPositionMode === "OneWay" && (
          <RowItem wide>
            <ReduceOnlyField />
          </RowItem>
        )}
      </Row>
      <Row>
        <PlaceOrderSubmitButton
          side={"Buy"}
          onSubmit={handleSubmit}
          placeOrderMode={placeOrderMode}
        />
      </Row>
      <Row size={"small"}>
        <PlaceOrderSubmitButton
          side={"Sell"}
          onSubmit={handleSubmit}
          placeOrderMode={placeOrderMode}
        />
      </Row>
      <PlaceOrderMaxCostInfo
        longCost={longCost}
        shortCost={shortCost}
        maxLong={maxLong}
        maxShort={maxShort}
      />
    </HookForm>
  );
};

export const StopLimitTradeFuturesForm = React.memo(_StopLimitTradeFuturesForm);
