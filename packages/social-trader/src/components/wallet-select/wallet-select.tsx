import { CurrencySourceSelect as HookFormCurrencySourceSelect } from "components/currency-source-select/hook-form-currency-source-select";
import { ISelectChangeEvent } from "components/select/select";
import { AssetDetails, Currency, WalletBaseData, WalletData } from "gv-api-web";
import { TransferItemType } from "modules/transfer/transfer.types";
import React from "react";

export type ItemsType = Array<WalletItemType>;
export type WalletItemType = WalletData | WalletBaseData | TransferItemType;
export interface CommonWalletType {
  id: string;
  title?: string;
  logoUrl?: string;
  currency: Currency;
  available: number;
  depositAddress?: string;
  asset?: AssetDetails;
  rate?: number;
  isWithdrawalEnabled?: boolean;
}

export interface IWalletSelectProps {
  name: string;
  disabled?: boolean;
}

interface Props extends IWalletSelectProps {
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  label: string;
  items: CommonWalletType[];
}

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
