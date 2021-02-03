import React, { useContext } from "react";
import { isAllow } from "components/deposit/components/deposit.helpers";
import { TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import { convertShapeToRules, minMaxNumberShape } from "utils/validators/validators";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { useTranslation } from "react-i18next";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";

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
    symbol: { quoteAsset },
    terminalType
  } = useContext(TerminalInfoContext);

  const isFutures = terminalType === "futures";

  return (
    <HookFormAmountField
      disabled={disabled}
      externalDirty={true}
      autoFocus={false}
      isAllowed={isAllow("BTC")}
      label={isFutures ? t("Cost") : label}
      currency={quoteAsset}
      name={TRADE_FORM_FIELDS.total}
      rules={convertShapeToRules(
        minMaxNumberShape({
          t,
          max,
          min: isFutures ? undefined : min
        })
      )}
    />
  );
};

export const TotalField = React.memo(_TotalField);
