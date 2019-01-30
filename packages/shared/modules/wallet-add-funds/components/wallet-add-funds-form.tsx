import copy from "copy-to-clipboard";
import { WalletInfo } from "gv-api-web";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { TranslationFunction, translate } from "react-i18next";
import { compose } from "redux";
import GVqr from "shared/components/gv-qr/gv-qr";
import CopyIcon from "shared/components/icon/copy-icon";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import ArrowIcon from "shared/media/arrow-down.svg";
import { IDispatchable } from "shared/utils/types";

export interface CurrentWallet {
  currency: string;
  available: number;
}

export interface IWalletAddFundsFormProps {
  wallets: WalletInfo[];
  currentWallet: CurrentWallet;
  notifySuccess(x: string): IDispatchable<void>;
  notifyError(x: string): IDispatchable<void>;
  t: TranslationFunction;
}

class WalletAddFundsForm extends React.Component<IWalletAddFundsFormProps> {
  render() {
    const {
      t,
      wallets,
      currentWallet,
      notifySuccess,
      notifyError
    } = this.props;
    const selected =
      wallets.find(w => w.currency === currentWallet.currency) || {};
    const { address } = selected;
    const onCopy = () => {
      try {
        copy(address);
        notifySuccess(t("wallet-add-funds.copy-to-clipboard-success"));
      } catch (error) {
        notifyError(t("wallet-add-funds.copy-to-clipboard-error"));
      }
    };

    return (
      <form id="add-funds" className="wallet-add-funds-popup">
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-add-funds.title")}</h2>
          </div>
          <div className="dialog-field">
            <div className="dialog__row">
              <img
                src={getWalletIcon(currentWallet.currency)}
                className="wallet-add-funds-popup__icon wallet-add-funds-popup__icon--currency"
                alt={currentWallet.currency}
              />
              <StatisticItem
                equivalent={currentWallet.available}
                equivalentCurrency={currentWallet.currency}
                big
                accent
              >
                {currentWallet.currency}
              </StatisticItem>
            </div>
          </div>
        </div>
        <div className="dialog__bottom wallet-add-funds-popup__bottom">
          <StatisticItem
            className="wallet-add-funds-popup__right-text"
            label={t("wallet-add-funds.from")}
          >
            <img
              src={ArrowIcon}
              alt="Icon"
              className="wallet-add-funds-popup__icon"
            />
            {t("wallet-add-funds.external")}
          </StatisticItem>
          <div className="dialog__info">
            {t("wallet-add-funds.warning", {
              currency: currentWallet.currency
            })}
          </div>
          <GVqr className="wallet-add-funds-popup__qr" value={address} />
          <StatisticItem
            className="wallet-add-funds-popup__address"
            label={t("wallet-add-funds.deposit-address")}
          >
            {address}
          </StatisticItem>
          <GVButton color="secondary" onClick={onCopy} disabled={!address}>
            <CopyIcon />
            &nbsp;
            {t("buttons.copy")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose(translate())(WalletAddFundsForm);
