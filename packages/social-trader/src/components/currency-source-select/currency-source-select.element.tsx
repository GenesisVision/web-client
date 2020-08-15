import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "components/currency-source-select/currency-source-select-items";
import GVTextField from "components/gv-text-field";
import { GVTextFieldProps } from "components/gv-text-field/gv-text-field.style";
import Select from "components/select/select";
import React from "react";

interface Props extends GVTextFieldProps {
  items: CurrencySourceSelectItemsType;
}

const _CurrencySourceSelect: React.FC<Props> = props => (
  <GVTextField {...props} fixedVertical InputComponent={Select}>
    {getCurrencySourceSelectItems(props.items)}
  </GVTextField>
);

export const CurrencySourceSelectElement = React.memo(_CurrencySourceSelect);
