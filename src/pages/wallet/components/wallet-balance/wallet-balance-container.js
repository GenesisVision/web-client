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

  render() {
    const {
      walletBalanceData,
      currentCurrency,
      addFunds,
      withdraw
    } = this.props;

    if (!walletBalanceData) return null;

    return (
      <WalletBalance
        walletBalanceData={walletBalanceData}
        currentCurrency={currentCurrency}
        handleAddFunds={addFunds}
        handleWithdraw={withdraw}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    walletBalanceData: state.wallet.balance.data,
    currentCurrency: state.wallet.currentCurrency.value
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(WalletServices, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletBalanceContainer);
