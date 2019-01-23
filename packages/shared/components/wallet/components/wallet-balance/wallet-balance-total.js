import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as WalletServices from "../../services/wallet.services";
import WalletBalanceElements from "./wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance-loader";

class WalletBalanceTotal extends Component {
  render() {
    const { t, walletBalanceData, currency } = this.props;

    return (
      <div className="wallet-balance">
        <WalletBalanceElements
          walletBalanceData={walletBalanceData}
          currentCurrency={currency}
        />
      </div>
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

export default WalletBalanceTotal;
