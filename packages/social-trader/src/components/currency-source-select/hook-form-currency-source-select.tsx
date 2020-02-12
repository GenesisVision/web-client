import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "components/currency-source-select/currency-source-select-items";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import Select, { ISelectChangeEvent } from "components/select/select";
import React from "react";

const _CurrencySourceSelect: React.FC<Props> = ({
  disabled,
  items,
  onChange,
  label,
  name
}) => {
  return (
    <GVHookFormField
      disableIfSingle
      wide
      disabled={disabled}
      name={name}
      component={GVTextField}
      label={label}
      InputComponent={Select}
      onChange={onChange}
    >
      {items && getCurrencySourceSelectItems(items)}
    </GVHookFormField>
  );
};

interface Props {
  items: CurrencySourceSelectItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  disabled?: boolean;
}

export const CurrencySourceSelect = React.memo(_CurrencySourceSelect);
