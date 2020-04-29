import { isAllow } from "components/deposit/components/deposit.helpers";
import { DialogButtons } from "components/dialog/dialog-buttons";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  getLotSizeFilter,
  getSymbolPriceFilter,
  isMinMaxAllow
} from "pages/trades/binance-trade-page/trading/trade/trade.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  OrderSide,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  price = "price",
  quantity = "quantity",
  total = "total"
}

export interface ILimitTradeFormValues {
  [FIELDS.price]: number;
  [FIELDS.quantity]: number;
  [FIELDS.total]: number;
}

interface Props {
  outerPrice: number;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  direction: OrderSide;
  onSubmit: (values: ILimitTradeFormValues) => any;
}

const _LimitTradeForm: React.FC<Props> = ({
  outerPrice,
  onSubmit,
  quoteAsset,
  baseAsset,
  direction
}) => {
  const [t] = useTranslation();

  const form = useForm<ILimitTradeFormValues>({
    defaultValues: { price: outerPrice },
    mode: "onChange"
  });
  const { watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  useEffect(() => {
    reset({ price: outerPrice, quantity, total });
  }, [outerPrice]);

  useEffect(() => {
    const value = (formatCurrencyValue(
      total / price,
      "BTC"
    ) as unknown) as number;
    if (value > 0) setValue(FIELDS.quantity, value);
  }, [total]);
  useEffect(() => {
    const value = (formatCurrencyValue(
      quantity * price,
      "BTC"
    ) as unknown) as number;
    if (value > 0) setValue(FIELDS.total, value);
  }, [quantity]);
  useEffect(() => {
    if (quantity)
      setValue(
        FIELDS.total,
        (formatCurrencyValue(quantity * price, "BTC") as unknown) as number
      );
  }, [price]);

  const { exchangeInfo } = useContext(TradingInfoContext);
  if (!exchangeInfo) return null;

  const filters = safeGetElemFromArray(
    exchangeInfo.symbols,
    symbol => symbol.symbol === getSymbol(baseAsset, quoteAsset)
  ).filters;
  const { minPrice, maxPrice, tickSize } = getSymbolPriceFilter(filters);
  const { minQty, maxQty } = getLotSizeFilter(filters);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row>
        <HookFormAmountField
          isAllowed={isMinMaxAllow(+minPrice, +maxPrice)}
          label={t("Price")}
          currency={quoteAsset}
          name={FIELDS.price}
        />
      </Row>
      <Row>
        <HookFormAmountField
          isAllowed={isMinMaxAllow(+minQty, +maxQty)}
          label={t("Amount")}
          currency={baseAsset}
          name={FIELDS.quantity}
        />
      </Row>
      <Row>
        <HookFormAmountField
          isAllowed={isAllow("BTC")}
          label={t("Total")}
          currency={quoteAsset}
          name={FIELDS.total}
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
