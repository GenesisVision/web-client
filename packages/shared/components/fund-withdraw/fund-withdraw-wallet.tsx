import { WalletData } from "gv-api-web";
import React, { Component } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Select, { OnChangeEvent } from "shared/components/select/select";

interface IFundWithdrawWalletProps {
  wallets: WalletData[];
  value: string;
  onChange(value: string): void;
}

class FundWithdrawWallet extends Component<
  IFundWithdrawWalletProps & WithTranslation
> {
  handleChange = (event: OnChangeEvent) => {
    this.props.onChange(event.target.value);
  };
  render() {
    const { t, wallets, value } = this.props;
    return (
      <div className="gv-text-field__wrapper">
        <label className="gv-text-field__label gv-text-field__label--shrink">
          {t("withdraw-fund.wallet")}
        </label>
        <div className="gv-text-field">
          <Select
            className="gv-text-field__input"
            value={value}
            onChange={this.handleChange}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <WalletImage
                    imageClassName="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                    url={wallet.logo}
                  />
                  {`${wallet.title} | ${wallet.currency}`}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
    );
  }
}

export default withTranslation()(FundWithdrawWallet);
