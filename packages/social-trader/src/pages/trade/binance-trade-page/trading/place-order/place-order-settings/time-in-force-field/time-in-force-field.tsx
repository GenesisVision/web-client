import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import {
  OrderType,
  TimeInForce as TimeInForceType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";

import { TRADE_FORM_FIELDS } from "../../place-order.types";

interface Props {
  orderType: OrderType;
}

export const TIME_IN_FORCE_VALUES: {
  value: TimeInForceType;
  label: string;
}[] = [
  { label: "GTC", value: "GoodTillCancel" },
  { label: "IOC", value: "ImmediateOrCancel" },
  { label: "FOK", value: "FillOrKill" }
];

const _TimeInForceField: React.FC<Props> = ({ orderType }) => {
  const { terminalType } = useContext(TerminalInfoContext);
  const values =
    terminalType === "spot" || orderType === "TakeProfitLimit"
      ? TIME_IN_FORCE_VALUES
      : [...TIME_IN_FORCE_VALUES, { value: "GoodTillCrossing", label: "GTX" }];
  return (
    <GVHookFormField
      fixedWidth={false}
      size={"small"}
      name={TRADE_FORM_FIELDS.timeInForce}
      component={SimpleTextField}
      InputComponent={Select}
    >
      {values.map(value => (
        <option value={value.value} key={value.value}>
          {value.label}
        </option>
      ))}
    </GVHookFormField>
  );
};

export const TimeInForceField = React.memo(_TimeInForceField);
