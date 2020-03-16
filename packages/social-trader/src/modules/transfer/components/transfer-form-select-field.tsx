import { HookFormWalletField as WalletSelect } from "components/deposit/components/form-fields/wallet-field";
import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { InternalTransferRequestType } from "gv-api-web";
import React from "react";
import { CurrencyEnum } from "utils/types";

export const TransferSelectField: React.FC<{
  name: string;
  label: string;
  items: ItemsType;
  onChange: (wallet: WalletItemType) => void;
  sourceType: InternalTransferRequestType;
  value: string;
  currency: CurrencyEnum;
}> = React.memo(
  ({ name, label, items, onChange, sourceType, value, currency }) => {
    return (
      <WalletSelect
        name={name}
        label={label}
        wallets={items}
        onChange={onChange}
      />
    );
  }
);
