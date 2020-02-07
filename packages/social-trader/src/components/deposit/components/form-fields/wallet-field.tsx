import { DialogField } from "components/dialog/dialog-field";
import { ISelectChangeEvent } from "components/select/select";
import WalletSelect, {
  HookFormWalletSelect
} from "components/wallet-select/wallet-select";
import { WalletBaseData } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

const _WalletField: React.FC<Props> = ({ name, wallets, onChange }) => {
  const [t] = useTranslation();
  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element): void => {
      const wallet = safeGetElemFromArray(
        wallets,
        wallet => wallet.id === target.props.value
      );
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

const _HookFormWalletField: React.FC<Props> = ({ name, wallets, onChange }) => {
  const [t] = useTranslation();
  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent): void => {
      const wallet = safeGetElemFromArray(
        wallets,
        wallet => wallet.id === event.target.value
      );
      onChange(wallet);
    },
    [wallets]
  );
  return (
    <DialogField>
      <HookFormWalletSelect
        name={name}
        label={t("follow-program.create-account.from")}
        items={wallets}
        onChange={onChangeCurrencyFrom}
      />
    </DialogField>
  );
};
export const HookFormWalletField = React.memo(_HookFormWalletField);
