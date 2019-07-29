import copy from "copy-to-clipboard";
import { WalletData } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import GVqr from "shared/components/gv-qr/gv-qr";
import GVTextField from "shared/components/gv-text-field";
import CopyIcon from "shared/components/icon/copy-icon";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader from "shared/decorators/with-loader";
import filesService from "shared/services/file-service";
import { CurrencyEnum } from "shared/utils/types";

const _WalletAddFundsForm: React.FC<Props> = ({
  t,
  wallets,
  notifySuccess,
  notifyError,
  currentWallet
}) => {
  const [currency, setCurrency] = useState<CurrencyEnum>(wallets[0].currency);
  useEffect(() => {
    const currentCurrency = currentWallet.currency;
    if (wallets.find(wallet => wallet.currency === currentCurrency))
      setCurrency(currentCurrency);
  });
  const onChangeCurrency = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setCurrency(event.target.value as CurrencyEnum),
    []
  );
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
          <GVTextField
            name="currency"
            label={t("wallet-deposit.select-currency")}
            InputComponent={Select}
            value={currency}
            onChange={onChangeCurrency}
          >
            {wallets.map(({ title, currency, logo }) => (
              <option value={currency} key={currency}>
                <img
                  src={filesService.getFileUrl(logo)}
                  className="wallet-withdraw-popup__icon"
                  alt={currency}
                />
                {`${title} | ${currency}`}
              </option>
            ))}
          </GVTextField>
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

export interface CurrentWallet {
  currency: CurrencyEnum;
  available: number;
}

interface OwnProps {
  wallets: WalletData[];
  currentWallet: CurrentWallet;
  notifySuccess(text: string): void;
  notifyError(text: string): void;
}

interface Props extends WithTranslation, OwnProps {}
