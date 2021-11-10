import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { FUTURES_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { minMaxNumberRules } from "utils/validators/validators";

import { getDecimalScale } from "../../../terminal.helpers";

interface Props {
  max: number;
  min: number;
  tickSize: string;
}

const _FuturesPriceField: React.FC<Props> = ({ max, min, tickSize }) => {
  const [t] = useTranslation();
  const {
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);

  return (
    <HookFormAmountField
      decimalScale={getDecimalScale(tickSize)}
      autoFocus={false}
      label={t("Price")}
      currency={quoteAsset}
      name={FUTURES_TRADE_FORM_FIELDS.price}
      rules={minMaxNumberRules({
        t,
        min,
        max
      })}
    />
  );
};

export const FuturesPriceField = React.memo(_FuturesPriceField);
