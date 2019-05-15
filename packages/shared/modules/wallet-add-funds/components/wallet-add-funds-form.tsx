import copy from "copy-to-clipboard";
import { WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import GVqr from "shared/components/gv-qr/gv-qr";
import GVTextField from "shared/components/gv-text-field";
import CopyIcon from "shared/components/icon/copy-icon";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";

class WalletAddFundsForm extends React.PureComponent<Props, State> {
  state = {
    currency: this.props.wallets[0].currency
  };

  componentDidMount() {
    const { wallets, currentWallet } = this.props;
    const currentCurrency = currentWallet.currency;
    if (wallets.find(wallet => wallet.currency === currentCurrency)) {
      this.setState({ currency: currentCurrency });
    }
  }

  onChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currency: event.target.value });
  };

  render() {
    const { t, wallets, notifySuccess, notifyError } = this.props;
    const selected = wallets.find(
      wallet => wallet.currency === this.state.currency
    )!;
    const { depositAddress } = selected;
    const onCopy = () => {
      try {
        copy(depositAddress);
        notifySuccess(t("wallet-deposit.copy-to-clipboard-success"));
      } catch (error) {
        notifyError(t("wallet-deposit.copy-to-clipboard-error"));
      }
    };

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
              value={this.state.currency}
              onChange={this.onChangeCurrency}
            >
              {wallets.map(wallet => {
                const { title, currency } = wallet;
                return (
                  <option value={currency} key={currency}>
                    <img
                      src={filesService.getFileUrl(wallet.logo)}
                      className="wallet-withdraw-popup__icon"
                      alt={currency}
                    />
                    {`${title} | ${currency}`}
                  </option>
                );
              })}
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
          <GVButton
            color="secondary"
            onClick={onCopy}
            disabled={!depositAddress}
          >
            <>
              <CopyIcon />
              &nbsp;
              {t("buttons.copy")}
            </>
          </GVButton>
        </div>
      </div>
    );
  }
}

export default translate()(WalletAddFundsForm);

export interface CurrentWallet {
  currency: string;
  available: number;
}

interface OwnProps {
  wallets: WalletData[];
  currentWallet: CurrentWallet;
  notifySuccess(x: string): void;
  notifyError(x: string): void;
}

interface State {
  currency: string;
}

interface Props extends InjectedTranslateProps, OwnProps {}
