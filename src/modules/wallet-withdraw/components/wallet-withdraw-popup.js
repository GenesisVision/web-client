import "./wallet-withdraw-popup.scss";

import WalletWithdrawForm from "modules/wallet-withdraw/components/wallet-withdraw-form";
import {
  fetchPaymentInfo,
  newWithdrawRequest
} from "modules/wallet-withdraw/services/wallet-withdraw.services";
import React, { Component } from "react";

class WalletWithdrawPopup extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    fetchPaymentInfo().then(data => this.setState({ ...data }));
  }

  handleSubmit = values => {
    this.setState({ isPending: true });
    newWithdrawRequest(values).then(data =>
      this.setState(state => {
        return {
          ...state,
          ...data,
          data: {
            ...state.data,
            ...data.data
          }
        };
      })
    );
  };

  render() {
    if (!this.state.data) return null;
    const { isPending, data, errorMessage } = this.state;
    const { wallets, availableToWithdrawal } = data;

    return (
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

WalletWithdrawPopup.propTypes = {};

export default WalletWithdrawPopup;
