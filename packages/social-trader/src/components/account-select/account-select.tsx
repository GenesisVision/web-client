import CurrencySourceSelect from "components/currency-source-select/currency-source-select";
import { ISelectChangeEvent } from "components/select/select";
import { TradingAccountDetails } from "gv-api-web";
import React from "react";

const _AccountSelect: React.FC<Props> = ({ items, onChange, label, name }) => (
  <CurrencySourceSelect
    label={label}
    items={items.map(item => ({ ...item, title: item.login }))}
    name={name}
    onChange={onChange}
  />
);

interface Props {
  items: TradingAccountDetails[];
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
}

const AccountSelect = React.memo(_AccountSelect);
export default AccountSelect;
