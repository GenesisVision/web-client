import { HookFormWalletField as WalletSelect } from "components/deposit/components/form-fields/wallet-field";
import { IUpdatableGvTextFieldProps } from "components/gv-text-field/updatable-gv-text-field";
import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { InternalTransferRequestType } from "gv-api-web";
import React from "react";
import { CurrencyEnum } from "utils/types";

interface Props extends IUpdatableGvTextFieldProps {
  name: string;
  label: string;
  items: ItemsType;
  onChange: (wallet: WalletItemType) => void;
  sourceType: InternalTransferRequestType;
  value: string;
  currency: CurrencyEnum;
}

export const TransferSelectField: React.FC<Props> = React.memo(
  ({ name, label, items, onChange, onClickUpdate }) => {
    return (
      <WalletSelect
        onClickUpdate={onClickUpdate}
        name={name}
        label={label}
        wallets={items}
        onChange={onChange}
      />
    );
  }
);
