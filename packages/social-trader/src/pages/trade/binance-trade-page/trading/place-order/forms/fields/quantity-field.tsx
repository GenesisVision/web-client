import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { SPOT_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { minMaxNumberRules } from "utils/validators/validators";

import { getDecimalScale } from "../../../terminal.helpers";

interface Props {
  max: number;
  min: number;
  stepSize?: string;
  isAllowed?: (values: NumberFormatValues) => boolean;
  percentMode?: boolean;
  setPercentMode?: (flag: boolean) => void;
  setSliderValue?: (value: number) => void;
}

const _QuantityField: React.FC<Props> = ({
  isAllowed,
  max,
  min,
  stepSize,
  percentMode,
  setPercentMode,
  setSliderValue
}) => {
  const [t] = useTranslation();
  const {
    symbol: { baseAsset },
    terminalType
  } = useContext(TerminalInfoContext);

  const isFutures = terminalType === "futures";

  return (
    <HookFormAmountField
      decimalScale={stepSize ? getDecimalScale(stepSize) : undefined}
      isAllowed={isAllowed}
      onChangeEffect={
        setPercentMode && setSliderValue
          ? () => {
              setPercentMode(false);
              setSliderValue(0);
            }
          : undefined
      }
      autoFocus={false}
      suffix={percentMode ? "%" : ""}
      label={isFutures ? t("Size") : t("Amount")}
      currency={baseAsset}
      name={SPOT_TRADE_FORM_FIELDS.quantity}
      key={percentMode}
      rules={
        percentMode
          ? minMaxNumberRules({
              t,
              min: 1,
              max: 100
            })
          : minMaxNumberRules({
              t,
              min,
              max
            })
      }
    />
  );
};

export const QuantityField = React.memo(_QuantityField);
