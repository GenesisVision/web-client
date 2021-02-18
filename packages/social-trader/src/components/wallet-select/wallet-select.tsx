import { CurrencySourceSelect as HookFormCurrencySourceSelect } from "components/currency-source-select/hook-form-currency-source-select";
import { IUpdatableGvTextFieldProps } from "components/gv-text-field/updatable-gv-text-field";
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
  withdrawalCommission?: number;

}

export interface IWalletSelectProps {
  name: string;
  disabled?: boolean;
}

interface Props extends IWalletSelectProps, IUpdatableGvTextFieldProps {
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  label: string;
  items: CommonWalletType[];
}

const _HookFormWalletSelect: React.FC<Props> = ({
  onClickUpdate,
  items,
  onChange,
  label,
  name,
  disabled
}) => (
  <HookFormCurrencySourceSelect
    onClickUpdate={onClickUpdate}
    disabled={disabled}
    label={label}
    items={items}
    name={name}
    onChange={onChange}
  />
);
export const HookFormWalletSelect = React.memo(_HookFormWalletSelect);
