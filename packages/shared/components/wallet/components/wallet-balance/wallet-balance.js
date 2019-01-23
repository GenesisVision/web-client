import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";

import * as WalletServices from "../../services/wallet.services";
import WalletBalanceElements from "./wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance-loader";

class WalletBalanceTotal extends Component {
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

  componentDidMount() {
    const { service } = this.props;
    service.fetchWalletBalance();
  }

  componentDidUpdate(prevProps) {
    const { service, currency } = this.props;
    if (currency !== prevProps.currency) {
      service.fetchWalletBalance();
    }
  }

  render() {
    const { t, walletBalanceData, currency } = this.props;

    return (
      <Fragment>
        <div className="wallet-balance">
          <h1>Ethereum wallet</h1>
          {!walletBalanceData ? (
            <WalletBalanceLoader />
          ) : (
            <WalletBalanceElements
              walletBalanceData={walletBalanceData}
              currentCurrency={currency}
              handleAddFunds={this.handleOpenAddFundsPopup}
              handleWithdraw={this.handleOpenWithdrawPopup}
            />
          )}
        </div>
        <WalletAddFundsPopup
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
        <WalletWithdrawPopup
          open={this.state.isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    walletBalanceData: state.wallet.balance.data,
    currency: state.accountSettings.currency
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(WalletServices, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WalletBalanceTotal);
