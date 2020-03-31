import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "components/currency-source-select/currency-source-select-items";
import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import Select from "components/select/select";
import React from "react";

const _CurrencySourceSelect: React.FC<Props> = props => (
  <GVTextField {...props} InputComponent={Select}>
    {getCurrencySourceSelectItems(props.items)}
  </GVTextField>
);

interface Props extends GVTextFieldProps {
  items: CurrencySourceSelectItemsType;
}

export const CurrencySourceSelectElement = React.memo(_CurrencySourceSelect);
