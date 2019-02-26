import { WalletData } from "gv-api-web";
import { IState } from "manager-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletTransferPopup from "shared/modules/wallet-transfer/wallet-transfer-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";
import RootState from "shared/reducers/root-reducer";
import filesService from "shared/services/file-service";

import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainer from "./wallet-container/wallet-container";

interface IWalletProps {
  info?: WalletData;
  isPending: boolean;
  t(str: string): string;
}

class WalletCurrency extends React.Component<IWalletProps> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false
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

  handleOpenTransferPopup = wallet => {
    this.setState({ isOpenTransferPopup: true, currentWallet: wallet });
  };

  handleCloseTransferPopup = () => {
    this.setState({ isOpenTransferPopup: false, currentWallet: {} });
  };

  render() {
    const { t, info, isPending, filters } = this.props;
    if ((!info && isPending) || !filters) return <WalletBalanceLoader />;
    if (!info) return <NotFoundPage />;
    const currentWallet = {
      currency: info.currency,
      available: info.available
    };
    return (
      <Page title={info.title}>
        <div className="wallet-balance">
          <div className="wallet-balance__wrapper">
            <h1 className="wallet-balance__title">
              {info.title}
              <span> {t("wallet-page.wallet")}</span>
              <img
                src={filesService.getFileUrl(info.logo)}
                className="wallet-balance__title-icon"
                alt="Icon"
              />
            </h1>
            <WalletBalanceButtons
              handleAddFunds={this.handleOpenAddFundsPopup}
              handleWithdraw={this.handleOpenWithdrawPopup}
              handleTransfer={this.handleOpenTransferPopup}
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

const mapStateToProps = (state: RootState, ownProps) => {
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
      : []
  };
};

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletCurrency);
