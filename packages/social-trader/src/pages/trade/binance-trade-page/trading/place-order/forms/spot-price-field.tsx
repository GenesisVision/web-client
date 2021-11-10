import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { SPOT_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { minMaxNumberRules } from "utils/validators/validators";

interface Props {
  max: number;
  min: number;
  label?: string;
}

const _SpotPriceField: React.FC<Props> = ({ label, max, min }) => {
  const [t] = useTranslation();
  const {
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);

  return (
    <HookFormAmountField
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

export const SpotPriceField = React.memo(_SpotPriceField);
