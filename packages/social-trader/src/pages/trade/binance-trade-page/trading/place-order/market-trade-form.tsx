import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { ReduceOnlyField } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import { PlaceOrderSlider } from "pages/trade/binance-trade-page/trading/place-order/place-order-slider";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { MarketTotalLabel } from "pages/trade/binance-trade-page/trading/place-order/market-total-label";
import { TotalField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/total-field";
import { QuantityField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/quantity-field";
import { PriceField } from "pages/trade/binance-trade-page/trading/place-order/forms/fields/price-field";

export interface IMarketTradeFormProps {
  filterValues: FilterValues;
  status: API_REQUEST_STATUS;
  outerPrice: string;
  side: OrderSide;
  onSubmit: (values: IPlaceOrderHandleSubmitValues) => any;
}

const _MarketTradeForm: React.FC<
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
      onSubmit={values => onSubmit({ ...values, type: "Market" })}
    >
      <Row hide>
        <PriceField min={minPrice} max={maxPrice} divider={+tickSize} />
      </Row>
      <LabeledValue label={t("Price")}>{t("Market price")}</LabeledValue>
      <Row>
        <QuantityField
          min={minQuantity}
          max={maxQuantityWithWallet}
          divider={+stepSize}
        />
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
      {isFutures && currentPositionMode === "OneWay" && (
        <Row size={"small"}>
          <RowItem>
            <ReduceOnlyField />
          </RowItem>
        </Row>
      )}
    </HookForm>
  );
};

export const MarketTradeForm = React.memo(_MarketTradeForm);
