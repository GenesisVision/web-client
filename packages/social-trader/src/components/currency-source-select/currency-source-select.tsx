import { CurrencyItem } from "components/currency-item/currency-item";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select, { ISelectChangeEvent } from "components/select/select";
import React from "react";
import { CurrencyEnum } from "utils/types";

const _CurrencySourceSelect: React.FC<Props> = ({
  items,
  onChange,
  label,
  name
}) => (
  <GVFormikField
    name={name}
    component={GVTextField}
    label={label}
    InputComponent={Select}
    onChange={onChange}
  >
    {items.map(({ logo, currency, title, id }) => (
      <option value={id} key={id}>
        <CurrencyItem
          logo={logo}
          name={`${title ? `${title} | ` : ""}${currency}`}
          small
          clickable={false}
        />
      </option>
    ))}
  </GVFormikField>
);

export type ItemsType = Array<ItemType>;
export interface ItemType {
  id: string;
  currency: CurrencyEnum;
  logo?: string;
  title?: string;
}

interface Props {
  items: ItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
}

const CurrencySourceSelect = React.memo(_CurrencySourceSelect);
export default CurrencySourceSelect;
