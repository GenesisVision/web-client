import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { ReduceOnlyField } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import {
  TIME_IN_FORCE_VALUES,
  TimeInForceField
} from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/time-in-force-field/time-in-force-field";
import { PlaceOrderSlider } from "pages/trade/binance-trade-page/trading/place-order/place-order-slider";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import { usePlaceOrderAutoFill } from "./hooks/place-order-auto-fill.hook";
import { usePlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { usePlaceOrderInfo } from "./hooks/place-order-info-hook";
import {
  FilterValues,
  IPlaceOrderFormValues,
  IPlaceOrderHandleSubmitValues,
  TRADE_FORM_FIELDS
} from "./place-order.types";
import { TotalField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/total-field";
import { QuantityField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/quantity-field";
import { PriceField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/price-field";

export interface ILimitTradeFormProps {
  filterValues: FilterValues;
  status: API_REQUEST_STATUS;
  outerPrice: string;
  side: OrderSide;
  onSubmit: (values: IPlaceOrderHandleSubmitValues) => any;
}

interface Props extends ILimitTradeFormProps {
  balanceBase: number;
  balanceQuote: number;
}

const _LimitTradeForm: React.FC<Props> = ({
  filterValues,
  status,
  balanceQuote,
  balanceBase,
  outerPrice,
  onSubmit,
  side
}) => {
  const {
    tickSize,
    stepSize,
    symbol: { baseAsset },
    terminalType
  } = useContext(TerminalInfoContext);
  const { currentPositionMode } = useContext(TerminalPlaceOrderContext);

  const isFutures = terminalType === "futures";

  const {
    minPrice,
    maxPrice,
    minQuantity,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  } = usePlaceOrderInfo({
    balanceBase,
    balanceQuote,
    side,
    filterValues
  });

  const form = useForm<IPlaceOrderFormValues>({
    defaultValues: {
      [TRADE_FORM_FIELDS.timeInForce]: TIME_IN_FORCE_VALUES[0].value,
      [TRADE_FORM_FIELDS.price]: outerPrice
    },
    mode: "onChange"
  });
  const { triggerValidation, watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  const { sliderValue, setSliderValue } = usePlaceOrderFormReset({
    status,
    triggerValidation,
    outerPrice,
    watch,
    reset,
    side,
    setValue,
    balanceBase,
    balanceQuote,
    quantityName: TRADE_FORM_FIELDS.quantity
  });

  usePlaceOrderAutoFill({
    buyWalletAvailable: balanceQuote,
    sellWalletAvailable: balanceBase,
    setSliderValue,
    side,
    totalName: TRADE_FORM_FIELDS.total,
    quantityName: TRADE_FORM_FIELDS.quantity,
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
        <PriceField min={minPrice} max={maxPrice} divider={+tickSize} />
      </Row>
      <Row>
        <QuantityField
          isAllowed={allowPositiveValuesNumberFormat(Number.MAX_SAFE_INTEGER)}
          min={minQuantity}
          max={maxQuantityWithWallet}
          divider={+stepSize}
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
          <TimeInForceField orderType={"Limit"} />
        </RowItem>
        {isFutures && currentPositionMode === "OneWay" && (
          <RowItem wide>
            <ReduceOnlyField />
          </RowItem>
        )}
      </Row>
    </HookForm>
  );
};

export const LimitTradeForm = React.memo(_LimitTradeForm);
