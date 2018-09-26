import "./wallet-add-funds-form.scss";

import WalletAddFundsForm from "modules/wallet-add-funds/components/wallet-add-funds-form";
import React, { Component } from "react";
import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";

class WalletAddFundsContainer extends Component {
  state = {
    isPending: false,
    data: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletApiProxy
      .v10WalletAddressesGet(authService.getAuthArg())
      .then(data => this.setState({ ...data }));
  }

  render() {
    if (!this.state.data) return null;
    const { wallets } = this.state.data;
    return <WalletAddFundsForm wallets={wallets} />;
  }
}

export default WalletAddFundsContainer;
