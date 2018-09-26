import WalletWithdrawConfirm from "modules/wallet-withdraw/components/wallet-withdraw-confirm";
import WalletWithdrawForm from "modules/wallet-withdraw/components/wallet-withdraw-form";
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
    newWithdrawRequest(values).then(data =>
      this.setState({ ...data, success: !data.errorMessage })
    );
  };

  render() {
    if (!this.state.data) return null;
    const { isPending, data, errorMessage, success } = this.state;
    const { wallets, availableToWithdrawal } = data;

    return success ? (
      <WalletWithdrawConfirm />
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
