import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { TimeInForce as TimeInForceType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";

import { SPOT_TRADE_FORM_FIELDS } from "../../place-order.types";

export const TIME_IN_FORCE_VALUES: {
  value: TimeInForceType;
  label: string;
}[] = [
  { label: "GTC", value: "GoodTillCancel" },
  { label: "IOC", value: "ImmediateOrCancel" },
  { label: "FOK", value: "FillOrKill" }
];

const _TimeInForceField: React.FC = () => {
  return (
    <GVHookFormField
      fixedWidth={false}
      size={"small"}
      name={SPOT_TRADE_FORM_FIELDS.timeInForce}
      component={SimpleTextField}
      InputComponent={Select}
    >
      {TIME_IN_FORCE_VALUES.map(value => (
        <option value={value.value} key={value.value}>
          {value.label}
        </option>
      ))}
    </GVHookFormField>
  );
};

export const TimeInForceField = React.memo(_TimeInForceField);
