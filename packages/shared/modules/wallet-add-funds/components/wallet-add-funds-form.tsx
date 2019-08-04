import copy from "copy-to-clipboard";
import { WalletData } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import GVqr from "shared/components/gv-qr/gv-qr";
import CopyIcon from "shared/components/icon/copy-icon";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

const _WalletAddFundsForm: React.FC<Props> = ({
  t,
  wallets,
  notifySuccess,
  notifyError,
  currentWallet
}) => {
  const [currency, setCurrency] = useState<CurrencyEnum>(
    currentWallet.currency
  );
  const [id, setId] = useState<string>(currentWallet.id);
  useEffect(
    () => {
      setCurrency(wallets.find(wallet => wallet.id === id)!.currency);
    },
    [id]
  );
  const onChangeWallet = useCallback((event: ISelectChangeEvent) => {
    setId(event.target.value);
  }, []);
  const selected = wallets.find(wallet => wallet.currency === currency)!;
  const { depositAddress } = selected;
  const onCopy = useCallback(
    () => {
      try {
        copy(depositAddress);
        notifySuccess(t("wallet-deposit.copy-to-clipboard-success"));
      } catch (error) {
        notifyError(t("wallet-deposit.copy-to-clipboard-error"));
      }
    },
    [depositAddress]
  );
  return (
    <div className="wallet-add-funds-popup">
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("wallet-deposit.title")}</h2>
        </div>
        <div className="dialog-field">
          <WalletSelect
            value={id}
            name={"currency"}
            label={t("wallet-deposit.select-currency")}
            items={wallets}
            onChange={onChangeWallet}
          />
        </div>
      </div>
      <div className="dialog__bottom wallet-add-funds-popup__bottom">
        <GVqr className="wallet-add-funds-popup__qr" value={depositAddress} />
        <StatisticItem
          className="wallet-add-funds-popup__address"
          label={t("wallet-deposit.deposit-address")}
        >
          {depositAddress}
        </StatisticItem>
        <GVButton color="secondary" onClick={onCopy} disabled={!depositAddress}>
          <>
            <CopyIcon />
            &nbsp;
            {t("buttons.copy")}
          </>
        </GVButton>
      </div>
    </div>
  );
};

const WalletAddFundsForm = withLoader(
  translate()(React.memo(_WalletAddFundsForm))
);
export default WalletAddFundsForm;

interface OwnProps {
  wallets: WalletData[];
  currentWallet: WalletData;
  notifySuccess(text: string): void;
  notifyError(text: string): void;
}

interface Props extends WithTranslation, OwnProps {}
