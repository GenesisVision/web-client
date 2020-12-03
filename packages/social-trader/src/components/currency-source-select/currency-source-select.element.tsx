import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "components/currency-source-select/currency-source-select-items";
import { GVTextFieldProps } from "components/gv-text-field/gv-text-field.style";
import {
  IUpdatableGvTextFieldProps,
  UpdatableGvTextField
} from "components/gv-text-field/updatable-gv-text-field";
import Select from "components/select/select";
import React from "react";

interface Props extends GVTextFieldProps, IUpdatableGvTextFieldProps {
  items: CurrencySourceSelectItemsType;
  options?: { showName?: boolean; showSymbol?: boolean };
}

const _CurrencySourceSelect: React.FC<Props> = props => (
  <UpdatableGvTextField {...props} fixedVertical InputComponent={Select}>
    {getCurrencySourceSelectItems(props.items, props.options)}
  </UpdatableGvTextField>
);

export const CurrencySourceSelectElement = React.memo(_CurrencySourceSelect);
