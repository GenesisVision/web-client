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
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import { SpotQuantityField } from "./forms/fields/spot-quantity-field";
import { SpotPriceField } from "./forms/spot-price-field";
import { usePlaceOrderAutoFill } from "./hooks/place-order-auto-fill.hook";
import { useSpotPlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { useSpotPlaceOrderInfo } from "./hooks/place-order-info-hook";
import {
  FilterValues,
  ISpotPlaceOrderDefaultFormValues,
  SPOT_TRADE_FORM_FIELDS
} from "./place-order.types";

export interface ILimitTradeFormProps {
  filterValues: FilterValues;
  status: API_REQUEST_STATUS;
  outerPrice: string;
  side: OrderSide;
  onSubmit: (
    values: ISpotPlaceOrderDefaultFormValues & { type: OrderType }
  ) => any;
}

interface Props extends ILimitTradeFormProps {
  balanceBase: number;
  balanceQuote: number;
}

const _LimitTradeSpotForm: React.FC<Props> = ({
  filterValues,
  status,
  balanceQuote,
  balanceBase,
  outerPrice,
  onSubmit,
  side
}) => {
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
    defaultValues: {
      [SPOT_TRADE_FORM_FIELDS.timeInForce]: TIME_IN_FORCE_VALUES[0].value,
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
      form={form}
      onSubmit={values => onSubmit({ ...values, type: "Limit" })}
    >
      <Row>
        <SpotPriceField min={minPrice} max={maxPrice} />
      </Row>
      <Row>
        <SpotQuantityField
          isAllowed={allowPositiveValuesNumberFormat(Number.MAX_SAFE_INTEGER)}
          min={minQuantity}
          max={maxQuantityWithWallet}
        />
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

export const LimitTradeSpotForm = React.memo(_LimitTradeSpotForm);
