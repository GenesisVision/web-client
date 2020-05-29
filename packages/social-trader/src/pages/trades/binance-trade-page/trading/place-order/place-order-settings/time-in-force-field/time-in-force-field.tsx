import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { TRADE_FORM_FIELDS } from "pages/trades/binance-trade-page/trading/place-order/place-order.helpers";
import {
  OrderType,
  TimeInForce as TimeInForceType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  orderType: OrderType;
}

export const TIME_IN_FORCE_VALUES: TimeInForceType[] = ["GTC", "IOC", "FOK"];

const _TimeInForceField: React.FC<Props> = ({ orderType }) => {
  const values: TimeInForceType[] =
    orderType === "STOP_LOSS_LIMIT"
      ? TIME_IN_FORCE_VALUES
      : [...TIME_IN_FORCE_VALUES, "GTX"];
  const [t] = useTranslation();
  return (
    <GVHookFormField
      fixedWidth={false}
      size={"small"}
      name={TRADE_FORM_FIELDS.timeInForce}
      component={SimpleTextField}
      label={t("TIF")}
      InputComponent={Select}
    >
      {values.map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </GVHookFormField>
  );
};

export const TimeInForceField = React.memo(_TimeInForceField);
