import WalletWithdrawForm from "modules/wallet-withdraw/components/wallet-withdraw-form";
import WalletWithdrawRequest from "modules/wallet-withdraw/components/wallet-withdraw-request/wallet-withdraw-request";
import {
  fetchPaymentInfo,
  newWithdrawRequest
} from "modules/wallet-withdraw/services/wallet-withdraw.services";
import React, { Component } from "react";

class WalletWithdrawContainer extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null,
    success: false
  };

  componentDidMount() {
    this.setState({ isPending: true });
    fetchPaymentInfo().then(data => this.setState({ ...data }));
  }

  handleSubmit = values => {
    this.setState({ isPending: true });
    newWithdrawRequest({ ...values, amount: Number(values.amount) }).then(
      response => {
        this.setState({ isPending: response.isPending, success: true });
      }
    );
  };

  render() {
    if (!this.state.data) return null;
    const { isPending, data, errorMessage, success } = this.state;
    const { wallets, availableToWithdrawal } = data;

    return success ? (
      <WalletWithdrawRequest />
    ) : (
      <WalletWithdrawForm
        availableToWithdrawal={availableToWithdrawal}
        wallets={wallets}
        disabled={isPending}
        errorMessage={errorMessage}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

WalletWithdrawContainer.propTypes = {};

export default WalletWithdrawContainer;
