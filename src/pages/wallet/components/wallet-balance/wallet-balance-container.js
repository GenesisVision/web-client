import WalletAddFundsPopup from "modules/wallet-add-funds/wallet-add-funds-popup";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as WalletServices from "../../services/wallet.services";
import WalletBalance from "./wallet-balance";

class WalletBalanceContainer extends Component {
  state = {
    isOpenAddFundsPopup: false
  };

  handleOpenAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: true });
  };

  handleCloseAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false });
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
    const { walletBalanceData, currency } = this.props;

    if (!walletBalanceData) return null;

    return (
      <Fragment>
        <WalletBalance
          walletBalanceData={walletBalanceData}
          currentCurrency={currency}
          handleAddFunds={this.handleOpenAddFundsPopup}
          handleWithdraw={this.withdraw}
        />
        <WalletAddFundsPopup
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletBalanceContainer);
