import { isAllow } from "components/deposit/components/deposit.helpers";
import { DialogButtons } from "components/dialog/dialog-buttons";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  getBalance,
  getLotSizeFilter,
  getMinNotionalFilter,
  getSymbolPriceFilter,
  ILimitTradeFormValues,
  LIMIT_FORM_FIELDS,
  limitValidationSchema
} from "pages/trades/binance-trade-page/trading/trade/trade.helpers";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Account,
  ExchangeInfo,
  OrderSide,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

export interface ILimitTradeFormProps {
  outerPrice: number;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  direction: OrderSide;
  onSubmit: (values: ILimitTradeFormValues) => any;
}

const _LimitTradeForm: React.FC<ILimitTradeFormProps & {
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
  const [autoFill, setAutoFill] = useState<boolean>(false);

  const filters = safeGetElemFromArray(
    exchangeInfo.symbols,
    symbol => symbol.symbol === getSymbol(baseAsset, quoteAsset)
  ).filters;
  const { minPrice, maxPrice, tickSize } = getSymbolPriceFilter(filters);
  const { minQty, maxQty } = getLotSizeFilter(filters);
  const { minNotional } = getMinNotionalFilter(filters);

  const form = useForm<ILimitTradeFormValues>({
    validationSchema: limitValidationSchema({
      t,
      quoteAsset,
      baseAsset,
      tickSize: +tickSize,
      maxPrice: +maxPrice,
      minPrice: +minPrice,
      maxQuantity: Math.min(
        +maxQty,
        +getBalance(
          accountInfo.balances,
          direction === "BUY" ? quoteAsset : baseAsset
        )
      ),
      minQuantity: +minQty,
      minNotional: +minNotional
    }),
    defaultValues: { price: outerPrice },
    mode: "onChange"
  });
  const { watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  useEffect(() => {
    reset({ price: outerPrice, quantity, total });
  }, [outerPrice]);

  useEffect(() => {
    if (!autoFill) {
      const value = (formatCurrencyValue(
        total / price,
        "BTC"
      ) as unknown) as number;
      if (value > 0) {
        setValue(LIMIT_FORM_FIELDS.quantity, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [total]);
  useEffect(() => {
    if (!autoFill) {
      const value = (formatCurrencyValue(
        quantity * price,
        "BTC"
      ) as unknown) as number;
      if (value > 0) {
        setValue(LIMIT_FORM_FIELDS.total, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [quantity]);
  useEffect(() => {
    if (!autoFill) {
      if (quantity) {
        setValue(
          LIMIT_FORM_FIELDS.total,
          (formatCurrencyValue(quantity * price, "BTC") as unknown) as number,
          true
        );
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [price]);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row>
        <HookFormAmountField
          label={t("Price")}
          currency={quoteAsset}
          name={LIMIT_FORM_FIELDS.price}
        />
      </Row>
      <Row>
        <HookFormAmountField
          label={t("Amount")}
          currency={baseAsset}
          name={LIMIT_FORM_FIELDS.quantity}
        />
      </Row>
      <Row>
        <HookFormAmountField
          isAllowed={isAllow("BTC")}
          label={t("Total")}
          currency={quoteAsset}
          name={LIMIT_FORM_FIELDS.total}
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
