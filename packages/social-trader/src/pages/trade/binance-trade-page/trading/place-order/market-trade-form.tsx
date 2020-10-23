import { isAllow } from "components/deposit/components/deposit.helpers";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Slider } from "components/range/range";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { ReduceOnlyField } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/terminal-place-order.context";
import {
  AssetBalance,
  ExchangeInfo,
  OrderSide
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import {
  IPlaceOrderFormValues,
  placeOrderDefaultValidationSchema,
  RANGE_MARKS,
  TRADE_FORM_FIELDS,
  usePlaceOrderAutoFill,
  usePlaceOrderFormReset,
  usePlaceOrderInfo
} from "./place-order.helpers";

export interface IMarketTradeFormProps {
  status: API_REQUEST_STATUS;
  outerPrice: number;
  side: OrderSide;
  onSubmit: (values: IPlaceOrderFormValues) => any;
}

const _MarketTradeForm: React.FC<IMarketTradeFormProps & {
  balances: AssetBalance[];
  exchangeInfo: ExchangeInfo;
}> = ({ status, balances, exchangeInfo, outerPrice, onSubmit, side }) => {
  const [t] = useTranslation();

  const {
    tickSize,
    stepSize,
    symbol: { baseAsset, quoteAsset },
    terminalType
  } = useContext(TerminalInfoContext);
  const { currentPositionMode } = useContext(TerminalPlaceOrderContext);

  const isFutures = terminalType === "futures";

  const {
    minPrice,
    maxPrice,
    minQty,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  } = usePlaceOrderInfo({
    balances,
    side,
    exchangeInfo
  });

  const form = useForm<IPlaceOrderFormValues>({
    validationSchema: placeOrderDefaultValidationSchema({
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
    balances,
    quantityName: TRADE_FORM_FIELDS.quantity
  });

  usePlaceOrderAutoFill({
    totalName: TRADE_FORM_FIELDS.total,
    quantityName: TRADE_FORM_FIELDS.quantity,
    setValue,
    price,
    quantity,
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
      <LabeledValue label={t("Price")}>
        {t("Market price")} <Text muted>(≈ {outerPrice})</Text>
      </LabeledValue>
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
          label={isFutures ? t("Cost") : t("Total")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.total}
        />
      </Row>
      {side === "SELL" && (
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
      <Row>
        <PlaceOrderSubmitButton
          isSuccessful={status === "SUCCESS"}
          side={side}
          asset={baseAsset}
        />
      </Row>
      {isFutures && currentPositionMode === false && (
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
