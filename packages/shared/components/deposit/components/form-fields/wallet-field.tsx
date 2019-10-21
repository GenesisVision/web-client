import { WalletBaseData } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DialogField } from "shared/components/dialog/dialog-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import WalletSelect from "shared/components/wallet-select/wallet-select";

const _WalletField: React.FC<Props> = ({ name, wallets, onChange }) => {
  const [t] = useTranslation();
  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element): void => {
      const wallet = wallets.find(wallet => wallet.id === target.props.value)!;
      onChange(wallet);
    },
    [wallets]
  );
  return (
    <DialogField>
      <WalletSelect
        name={name}
        label={t("follow-program.create-account.from")}
        items={wallets}
        onChange={onChangeCurrencyFrom}
      />
    </DialogField>
  );
};

interface Props {
  wallets: WalletBaseData[];
  name: string;
  onChange: (wallet: WalletBaseData) => void;
}

export const WalletField = React.memo(_WalletField);
