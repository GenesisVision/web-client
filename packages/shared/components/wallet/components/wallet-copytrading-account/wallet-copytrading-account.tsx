import React, { Component, ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import Page from "shared/components/page/page";
import RootState from "shared/reducers/root-reducer";

import WalletImage from "../../../avatar/wallet-image/wallet-image";

interface IWalletCopytradingAccountProps {
  preferredCurrency: string;
  walletCurrency: string;
}

class WalletCopytradingAccount extends Component<
  IWalletCopytradingAccountProps & InjectedTranslateProps
> {
  componentDidUpdate() {}

  render() {
    const { t } = this.props;
    return (
      <Page title={t("Copytrading account")}>
        <div className="wallet-balance">
          <div className="wallet-balance__wrapper">
            <h1 className="wallet-balance__title">
              {"Wallet"}
              <span> {t("wallet-page.wallet")}</span>
              <WalletImage
                url={"transaction.logoFrom"}
                imageClassName="wallet-transactions__icon"
                alt={"transaction.currencyFrom"}
              />
            </h1>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps) => {
  const { currency: walletCurrency } = ownProps.match.params;
  const { currency: preferredCurrency } = state.accountSettings;

  return { preferredCurrency, walletCurrency };
};

export default compose<ComponentType<void>>(
  connect(mapStateToProps),
  translate()
)(WalletCopytradingAccount);
