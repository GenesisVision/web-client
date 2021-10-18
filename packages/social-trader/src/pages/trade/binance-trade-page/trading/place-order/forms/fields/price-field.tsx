import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { SPOT_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { minMaxNumberRules } from "utils/validators/validators";

import { getDecimalScale } from "../../../terminal.helpers";

interface Props {
  max: number;
  min: number;
  tickSize?: string;
  label?: string;
}

const _PriceField: React.FC<Props> = ({ label, max, min, tickSize }) => {
  const [t] = useTranslation();
  const {
    terminalType,
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);
  // fix maxLength logic
  const maxLength =
    terminalType === "futures"
      ? 10 + tickSize!.length + quoteAsset.length
      : undefined;

  return (
    <HookFormAmountField
      decimalScale={tickSize ? getDecimalScale(tickSize) : undefined}
      maxlength={maxLength}
      autoFocus={false}
      label={label || t("Price")}
      currency={quoteAsset}
      name={SPOT_TRADE_FORM_FIELDS.price}
      rules={minMaxNumberRules({
        t,
        min,
        max
      })}
    />
  );
};

export const PriceField = React.memo(_PriceField);
