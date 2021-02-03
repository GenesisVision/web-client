import React, { useContext } from "react";
import { TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import { minMaxNumberRules } from "utils/validators/validators";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { useTranslation } from "react-i18next";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { NumberFormatValues } from "react-number-format";

interface Props {
  max: number;
  min: number;
  isAllowed?: (values: NumberFormatValues) => boolean;
}

const _QuantityField: React.FC<Props> = ({ isAllowed, max, min }) => {
  const [t] = useTranslation();
  const {
    symbol: { baseAsset }
  } = useContext(TerminalInfoContext);

  return (
    <HookFormAmountField
      isAllowed={isAllowed}
      autoFocus={false}
      label={t("Amount")}
      currency={baseAsset}
      name={TRADE_FORM_FIELDS.quantity}
      rules={minMaxNumberRules({
        t,
        min,
        max
      })}
    />
  );
};

export const QuantityField = React.memo(_QuantityField);
