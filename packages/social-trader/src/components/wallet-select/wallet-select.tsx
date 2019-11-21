import "./wallet-select.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select, { ISelectChangeEvent } from "components/select/select";
import { TradingAccountDetails, WalletBaseData, WalletData } from "gv-api-web";
import React from "react";

const _WalletSelect: React.FC<Props> = ({ items, onChange, label, name }) => (
  <GVFormikField
    name={name}
    component={GVTextField}
    label={label}
    InputComponent={Select}
    onChange={onChange}
  >
    {items.map(mapToWalletOption).map(({ id, logo, currency, title }) => (
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
export type ItemType = WalletData | WalletBaseData | TradingAccountDetails;

const mapToWalletOption = (item: ItemType) => {
  const logo = "logo" in item ? item.logo : undefined;
  const title =
    "title" in item ? item.title : "login" in item ? item.login : undefined;
  return {
    ...item,
    logo,
    title
  };
};

interface Props {
  items: ItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
}

const WalletSelect = React.memo(_WalletSelect);
export default WalletSelect;
