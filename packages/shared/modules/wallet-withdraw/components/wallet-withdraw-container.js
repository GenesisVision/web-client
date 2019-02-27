import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

class WalletWithdrawContainer extends Component {
  state = {
    isPending: false,
    errorMessage: null,
    success: false
  };

  handleSubmit = values => {
    this.setState({ isPending: true });
    this.props.service
      .newWithdrawRequest({ ...values, amount: Number(values.amount) })
      .then(() => {
        this.setState({
          isPending: false,
          success: true
        });
      })
      .catch(error => {
        this.setState({
          isPending: false,
          success: false,
          errorMessage: error.errorMessage
        });
      });
  };

  render() {
    const { isPending, errorMessage, success } = this.state;
    const { twoFactorEnabled, wallets, currentWallet } = this.props;
    const enabledWallets = wallets.filter(wallet => wallet.isWithdrawalEnabled);

    return success ? (
      <WalletWithdrawRequest />
    ) : (
      <WalletWithdrawForm
        wallets={enabledWallets}
        currentWallet={currentWallet}
        disabled={isPending}
        errorMessage={errorMessage}
        onSubmit={this.handleSubmit}
        twoFactorEnabled={twoFactorEnabled}
      />
    );
  }
}

const mapStateToProps = state => {
  if (!state.accountSettings && !state.wallet.info.data) return;
  const { twoFactorEnabled } = state.accountSettings.twoFactorAuth.data;
  const { wallets } = state.wallet.info.data;
  return { twoFactorEnabled, wallets };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(walletWithdrawService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletWithdrawContainer);
