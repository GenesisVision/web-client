import { HookFormWalletField as WalletSelect } from "components/deposit/components/form-fields/wallet-field";
import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { InternalTransferRequestType } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
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
    const [t] = useTranslation();
    return (
      <>
        <DialogField>
          <WalletSelect
            name={name}
            label={label}
            wallets={items}
            onChange={onChange}
          />
        </DialogField>
        <DialogField>
          <StatisticItem label={t(`transfer.available${sourceType}From`)} big>
            {`${value} ${currency}`}
          </StatisticItem>
        </DialogField>
      </>
    );
  }
);
