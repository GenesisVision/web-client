import { WalletData } from "gv-api-web";
import { IState } from "manager-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import BTCIcon from "shared/media/currency/BTC.svg";
import ETHIcon from "shared/media/currency/ETH.svg";
import GVTIcon from "shared/media/currency/GVT.svg";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";

import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainer from "./wallet-container/wallet-container";

const Icons = {
  GVT: GVTIcon,
  BTC: BTCIcon,
  ETH: ETHIcon
};

export const getWalletIcon = (currency: string): string => {
  return Icons[currency];
};

interface IWalletProps {
  currency: string;
  info?: WalletData;
  isPending: boolean;
  t(str: string): string;
}

class WalletCurrency extends React.Component<IWalletProps> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false
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

  render() {
    const { currency, info, isPending } = this.props;
    if (!info && isPending) return <WalletBalanceLoader />;
    if (!info) return <NotFoundPage />;
    const { available } = info;
    return (
      <Page title={info.title}>
        <div className="wallet-balance">
          <h1>
            {info.title}
            <img
              src={getWalletIcon(info.currency)}
              className="wallet-balance__header-icon"
              alt="Icon"
            />
          </h1>

          <WalletBalanceElements
            walletBalanceData={info}
            handleAddFunds={this.handleOpenAddFundsPopup}
            handleWithdraw={this.handleOpenWithdrawPopup}
          />
        </div>
        <WalletContainer
          currency={currency}
          eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
        />
        <WalletAddFundsPopup
          currentWallet={{ currency, available }}
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
        <WalletWithdrawPopup
          currentWallet={info}
          open={this.state.isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: IState, ownProps) => {
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
    currency: currency.toUpperCase()
  };
};

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletCurrency);
