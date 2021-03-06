import React, { useContext } from "react";
import { TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import { minMaxNumberRules } from "utils/validators/validators";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { useTranslation } from "react-i18next";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";

interface Props {
  max: number;
  min: number;
  label?: string;
}

const _PriceField: React.FC<Props> = ({ label, max, min }) => {
  const [t] = useTranslation();
  const {
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);

  return (
    <HookFormAmountField
      autoFocus={false}
      label={label || t("Price")}
      currency={quoteAsset}
      name={TRADE_FORM_FIELDS.price}
      rules={minMaxNumberRules({
        t,
        min,
        max
      })}
    />
  );
};

export const PriceField = React.memo(_PriceField);
