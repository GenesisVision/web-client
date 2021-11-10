import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { FUTURES_TRADE_FORM_FIELDS } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { minMaxNumberRules } from "utils/validators/validators";

import { getDecimalScale } from "../../../terminal.helpers";

interface Props {
  max: number;
  min: number;
  stepSize: string;
  percentMode: boolean;
  setPercentMode: (flag: boolean) => void;
  setSliderValue: (value: number) => void;
  isAllowed?: (values: NumberFormatValues) => boolean;
}

const _FuturesQuantityField: React.FC<Props> = ({
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
    symbol: { baseAsset }
  } = useContext(TerminalInfoContext);

  return (
    <HookFormAmountField
      decimalScale={getDecimalScale(stepSize)}
      isAllowed={isAllowed}
      onChangeEffect={() => {
        setPercentMode(false);
        setSliderValue(0);
      }}
      autoFocus={false}
      suffix={percentMode ? "%" : ""}
      label={t("Size")}
      currency={baseAsset}
      name={FUTURES_TRADE_FORM_FIELDS.quantity}
      key={percentMode as any}
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

export const FuturesQuantityField = React.memo(_FuturesQuantityField);
