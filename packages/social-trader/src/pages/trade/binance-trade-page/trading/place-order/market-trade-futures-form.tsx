import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { ReduceOnlyField } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import { PlaceOrderSlider } from "pages/trade/binance-trade-page/trading/place-order/place-order-slider";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import React, { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import { FuturesQuantityField } from "./forms/fields/futures-quantity-field";
import { useFuturesPlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { useFuturesPlaceOrderSlider } from "./hooks/place-order-futures-slider.hook";
import { useFuturesPlaceOrderInfo } from "./hooks/place-order-info-hook";
import { useMarketPlaceOrderMaxCostValues } from "./hooks/place-order-max-cost-values.hook";
import {
  FilterValues,
  FUTURES_TRADE_FORM_FIELDS,
  FuturesPlaceOrderMode,
  IFuturesPlaceOrderFormValues,
  IFuturesPlaceOrderHandleSubmitValues
} from "./place-order.types";
import {
  PlaceOrderMaxCostInfo,
  PlaceOrderSliderBuySellInfo
} from "./place-order-max-cost-info";

interface IMarketTradeFormProps {
  balance: number;
  filterValues: FilterValues;
  placeOrderMode: FuturesPlaceOrderMode;
  status: API_REQUEST_STATUS;
  onSubmit: (values: IFuturesPlaceOrderHandleSubmitValues) => any;
}

const _MarketTradeFuturesForm: React.FC<IMarketTradeFormProps> = ({
  balance,
  placeOrderMode,
  filterValues,
  status,
  onSubmit
}) => {
  const [t] = useTranslation();
  const { currentPositionMode } = useContext(TerminalPlaceOrderContext);

  const { minQuantity, maxQuantity } = useFuturesPlaceOrderInfo({
    filterValues,
    type: "Market"
  });

  const form = useForm<IFuturesPlaceOrderFormValues>({
    mode: "onChange"
  });
  const { triggerValidation, watch, setValue, reset } = form;
  const { quantity } = watch();

  useFuturesPlaceOrderFormReset({
    status,
    triggerValidation,
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
  } = useMarketPlaceOrderMaxCostValues({
    balance,
    quantity,
    percentMode
  });

  const handleSubmit = values => {
    return onSubmit({ ...values, percentMode, sliderBuy, sliderSell });
  };

  return (
    <HookForm form={form}>
      <LabeledValue label={t("Price")}>{t("Market price")}</LabeledValue>
      <Row>
        <FuturesQuantityField
          percentMode={percentMode}
          stepSize={filterValues.marketStepSize}
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
      {currentPositionMode === "OneWay" && (
        <Row size={"small"}>
          <RowItem>
            <ReduceOnlyField />
          </RowItem>
        </Row>
      )}
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

export const MarketTradeFuturesForm = React.memo(_MarketTradeFuturesForm);
