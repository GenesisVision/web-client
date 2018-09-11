import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as WalletServices from "../../services/wallet.services";
import WalletBalance from "./wallet-balance";

class WalletBalanceContainer extends Component {
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
    const { walletBalanceData, currency, addFunds, withdraw } = this.props;

    if (!walletBalanceData) return null;

    return (
      <WalletBalance
        walletBalanceData={walletBalanceData}
        currentCurrency={currency}
        handleAddFunds={addFunds}
        handleWithdraw={withdraw}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletBalanceContainer);
