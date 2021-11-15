import { isAllow } from "components/deposit/components/deposit.helpers";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { SPOT_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { minMaxNumberRules } from "utils/validators/validators";

interface Props {
  max: number;
  min: number;
  label?: React.ReactNode;
  disabled?: boolean;
}

const _TotalField: React.FC<Props> = ({
  label = "Total",
  max,
  min,
  disabled
}) => {
  const [t] = useTranslation();
  const {
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);

  return (
    <HookFormAmountField
      disabled={disabled}
      externalDirty={true}
      autoFocus={false}
      isAllowed={isAllow("BTC")}
      label={label}
      currency={quoteAsset}
      name={SPOT_TRADE_FORM_FIELDS.total}
      triggerRules={max}
      rules={minMaxNumberRules({
        t,
        max,
        min
      })}
    />
  );
};

export const TotalField = React.memo(_TotalField);
