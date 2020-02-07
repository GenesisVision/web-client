import CurrencySourceSelect from "components/currency-source-select/currency-source-select";
import { CurrencySourceSelect as HookFormCurrencySourceSelect } from "components/currency-source-select/hook-form-currency-source-select";
import { ISelectChangeEvent } from "components/select/select";
import { WalletBaseData, WalletData } from "gv-api-web";
import { TransferItemType } from "modules/transfer/transfer.types";
import React from "react";

const _WalletSelect: React.FC<Props> = ({
  items,
  onChange,
  label,
  name,
  disabled
}) => (
  <CurrencySourceSelect
    disabled={disabled}
    label={label}
    items={items}
    name={name}
    onChange={onChange}
  />
);

export type ItemsType = Array<WalletItemType>;
export type WalletItemType = WalletData | WalletBaseData | TransferItemType;

interface Props {
  items: ItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  disabled?: boolean;
}

const WalletSelect = React.memo(_WalletSelect);
export default WalletSelect;

const _HookFormWalletSelect: React.FC<Props> = ({
  items,
  onChange,
  label,
  name,
  disabled
}) => (
  <HookFormCurrencySourceSelect
    disabled={disabled}
    label={label}
    items={items}
    name={name}
    onChange={onChange}
  />
);
export const HookFormWalletSelect = React.memo(_HookFormWalletSelect);
