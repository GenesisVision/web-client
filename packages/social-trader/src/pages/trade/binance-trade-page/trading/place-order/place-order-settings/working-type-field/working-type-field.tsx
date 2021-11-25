import { GVHookFormField } from "components/gv-hook-form-field";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { BinanceWorkingType } from "gv-api-web";
import React from "react";

import { FUTURES_TRADE_FORM_FIELDS } from "../../place-order.types";

export const WORKING_TYPE_VALUES: {
  value: BinanceWorkingType;
  label: string;
}[] = [
  { label: "Last", value: "Contract" },
  { label: "Mark", value: "Mark" }
];

const _WorkingTypeField: React.FC = () => {
  return (
    <GVHookFormField
      fixedWidth={false}
      size={"small"}
      name={FUTURES_TRADE_FORM_FIELDS.workingType}
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      component={SimpleTextField}
      InputComponent={Select}
    >
      {WORKING_TYPE_VALUES.map(value => (
        <option value={value.value} key={value.value}>
          {value.label}
        </option>
      ))}
    </GVHookFormField>
  );
};

export const WorkingTypeField = React.memo(_WorkingTypeField);
