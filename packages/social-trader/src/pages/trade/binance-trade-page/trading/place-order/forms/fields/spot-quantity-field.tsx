import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { SPOT_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { minMaxNumberRules } from "utils/validators/validators";

interface Props {
  max: number;
  min: number;
  isAllowed?: (values: NumberFormatValues) => boolean;
}

const _SpotQuantityField: React.FC<Props> = ({ isAllowed, max, min }) => {
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
      name={SPOT_TRADE_FORM_FIELDS.quantity}
      rules={minMaxNumberRules({
        t,
        min,
        max
      })}
    />
  );
};

export const SpotQuantityField = React.memo(_SpotQuantityField);
