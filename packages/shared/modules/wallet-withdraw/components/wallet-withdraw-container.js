import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

class WalletWithdrawContainer extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null,
    success: false
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletWithdrawService
      .fetchPaymentInfo()
      .then(data => this.setState({ data, isPending: false }));
  }

  handleSubmit = values => {
    this.setState({ isPending: true });
    this.props.service
      .newWithdrawRequest({ ...values, amount: Number(values.amount) })
      .then(response => {
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
    if (!this.state.data) return null;
    const { isPending, data, errorMessage, success } = this.state;
    const { wallets, availableToWithdrawal } = data;
    const { twoFactorEnabled, currentWallet } = this.props;

    return success ? (
      <WalletWithdrawRequest />
    ) : (
      <WalletWithdrawForm
        availableToWithdrawal={availableToWithdrawal}
        wallets={wallets}
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
  if (!state.accountSettings) return;
  const { twoFactorEnabled } = state.accountSettings.twoFactorAuth.data;
  return { twoFactorEnabled };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(walletWithdrawService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletWithdrawContainer);
