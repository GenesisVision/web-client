import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "components/currency-source-select/currency-source-select-items";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select, { ISelectChangeEvent } from "components/select/select";
import React from "react";

const _CurrencySourceSelect: React.FC<Props> = ({
  disabled,
  items,
  onChange,
  label,
  name
}) => (
  <GVFormikField
    wide
    disabled={disabled}
    name={name}
    component={GVTextField}
    label={label}
    InputComponent={Select}
    onChange={onChange}
  >
    {items && getCurrencySourceSelectItems(items)}
  </GVFormikField>
);

interface Props {
  items: CurrencySourceSelectItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  disabled?: boolean;
}

const CurrencySourceSelect = React.memo(_CurrencySourceSelect);
export default CurrencySourceSelect;
