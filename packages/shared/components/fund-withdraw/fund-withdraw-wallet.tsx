import { WalletBaseData } from "gv-api-web";
import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Select, { ISelectChangeEvent } from "shared/components/select/select";

class _FundWithdrawWallet extends Component<OwnProps & InjectedTranslateProps> {
  handleChange = (event: ISelectChangeEvent) => {
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
            name="wallet"
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

const FundWithdrawWallet = translate()(_FundWithdrawWallet);
export default FundWithdrawWallet;

interface OwnProps {
  wallets: WalletBaseData[];
  value: string;
  onChange(value: string): void;
}
