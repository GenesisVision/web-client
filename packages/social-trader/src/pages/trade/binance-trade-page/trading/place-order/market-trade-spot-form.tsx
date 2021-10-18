import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { PriceField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/price-field";
import { QuantityField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/quantity-field";
import { TotalField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/total-field";
import { MarketTotalLabel } from "pages/trade/binance-trade-page/trading/place-order/market-total-label";
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

import { usePlaceOrderAutoFill } from "./hooks/place-order-auto-fill.hook";
import { useSpotPlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { useSpotPlaceOrderInfo } from "./hooks/place-order-info-hook";
import {
  FilterValues,
  ISpotPlaceOrderDefaultFormValues,
  SPOT_TRADE_FORM_FIELDS
} from "./place-order.types";

export interface IMarketTradeFormProps {
  filterValues: FilterValues;
  status: API_REQUEST_STATUS;
  outerPrice: string;
  side: OrderSide;
  onSubmit: (
    values: ISpotPlaceOrderDefaultFormValues & { type: OrderType }
  ) => any;
}

const _MarketTradeSpotForm: React.FC<
  IMarketTradeFormProps & {
    balanceBase: number;
    balanceQuote: number;
  }
> = ({
  balanceQuote,
  balanceBase,
  filterValues,
  status,
  outerPrice,
  onSubmit,
  side
}) => {
  const [t] = useTranslation();

  const {
    symbol: { baseAsset }
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

  const form = useForm<ISpotPlaceOrderDefaultFormValues>({
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
      form={form}
      onSubmit={values => onSubmit({ ...values, type: "Market" })}
    >
      <Row hide>
        <PriceField min={minPrice} max={maxPrice} />
      </Row>
      <LabeledValue label={t("Price")}>{t("Market price")}</LabeledValue>
      <Row>
        <QuantityField min={minQuantity} max={maxQuantityWithWallet} />
      </Row>
      <Row>
        <TotalField
          max={maxTotalWithWallet}
          min={minNotional}
          label={<MarketTotalLabel />}
          disabled
        />
      </Row>
      <Row wide onlyOffset>
        <PlaceOrderSlider value={sliderValue} setValue={setSliderValue} />
      </Row>
      <Row>
        <PlaceOrderSubmitButton
          isSuccessful={status === "SUCCESS"}
          side={side}
          asset={baseAsset}
        />
      </Row>
    </HookForm>
  );
};

export const MarketTradeSpotForm = React.memo(_MarketTradeSpotForm);
