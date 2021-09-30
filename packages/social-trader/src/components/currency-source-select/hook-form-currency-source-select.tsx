import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "components/currency-source-select/currency-source-select-items";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import {
  IUpdatableGvTextFieldProps,
  UpdatableGvTextField
} from "components/gv-text-field/updatable-gv-text-field";
import Select, { ISelectChangeEvent } from "components/select/select";
import React from "react";

interface Props extends IUpdatableGvTextFieldProps {
  items: CurrencySourceSelectItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  disabled?: boolean;
  withUpdateButton?: boolean;
}

const _CurrencySourceSelect: React.FC<Props> = ({
  onClickUpdate,
  disabled,
  items,
  onChange,
  label,
  name,
  withUpdateButton
}) => {
  return (
    <GVHookFormField
      onClickUpdate={onClickUpdate}
      disableIfSingle
      wide
      disabled={disabled}
      name={name}
      component={withUpdateButton ? UpdatableGvTextField : GVTextField}
      label={label}
      InputComponent={Select}
      onChange={onChange}
    >
      {items && getCurrencySourceSelectItems(items)}
    </GVHookFormField>
  );
};

export const CurrencySourceSelect = React.memo(_CurrencySourceSelect);
