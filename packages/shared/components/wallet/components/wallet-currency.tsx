import { MultiWalletFilters, WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import { CurrentWallet } from "shared/modules/wallet-add-funds/components/wallet-add-funds-container";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletTransferPopup from "shared/modules/wallet-transfer/wallet-transfer-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";
import RootState from "shared/reducers/root-reducer";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainer from "./wallet-container/wallet-container";

interface IWalletProps {
  info?: WalletData;
  isPending: boolean;
  filters?: MultiWalletFilters[];
}

class WalletCurrency extends React.Component<
  IWalletProps & InjectedTranslateProps & WalletRouteProps
> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false,
    currencyWallet: undefined
  };

  handleOpenAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: true });
  };

  handleCloseAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false });
  };

  handleOpenWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: true });
  };

  handleCloseWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: false });
  };

  handleOpenTransferPopup = (wallet: CurrentWallet) => {
    this.setState({ isOpenTransferPopup: true, currentWallet: wallet });
  };

  handleCloseTransferPopup = () => {
    this.setState({ isOpenTransferPopup: false, currentWallet: {} });
  };

  render() {
    const { t, info, isPending, filters } = this.props;
    if ((!info && isPending) || !filters) return <WalletBalanceLoader />;
    if (!info) return <NotFoundPage />;
    const currentWallet: CurrentWallet = {
      currency: info.currency,
      available: info.available
    };
    return (
      <Page title={info.title}>
        <div className="wallet-balance">
          <div className="wallet-balance__wrapper">
            <h1 className="wallet-balance__title">
              {info.title}
              <span>&nbsp;{t("wallet-page.wallet")}</span>
              <WalletImage
                url={info.logo}
                imageClassName="wallet-balance__title-icon"
                alt={info.currency}
              />
            </h1>
            <WalletBalanceButtons
              handleAddFunds={this.handleOpenAddFundsPopup}
              handleWithdraw={this.handleOpenWithdrawPopup}
              handleTransfer={this.handleOpenTransferPopup}
              isDepositEnabled={info.isDepositEnabled}
              isWithdrawalEnabled={info.isWithdrawalEnabled}
            />
          </div>
          <WalletBalanceElements
            available={info.available}
            pending={info.pending}
            total={info.total}
            invested={info.invested}
            currency={info.currency}
          />
        </div>
        {/*
         //@ts-ignore TODO*/}
        <WalletContainer filters={filters} currency={info.currency} />
        <WalletAddFundsPopup
          currentWallet={currentWallet}
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
        <WalletWithdrawPopup
          currentWallet={info}
          open={this.state.isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
        <WalletTransferPopup
          currentWallet={info}
          open={this.state.isOpenTransferPopup}
          onClose={this.handleCloseTransferPopup}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: WalletRouteProps) => {
  const isPending = state.wallet.info.isPending;
  const { currency } = ownProps.match.params;
  const info = state.wallet.info.data
    ? state.wallet.info.data.wallets.find(
        wallet => wallet.currency === currency.toUpperCase()
      )
    : null;
  return {
    info,
    isPending,
    filters: state.platformData.data
      ? state.platformData.data.enums.multiWallet
      : undefined
  };
};

export default compose<React.FunctionComponent<WalletRouteProps>>(
  connect(mapStateToProps),
  translate()
)(WalletCurrency);
