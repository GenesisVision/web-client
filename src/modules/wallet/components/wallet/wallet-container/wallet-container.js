import { connect } from "react-redux";
import React, { Component } from "react";

import walletActions from "../../../actions/wallet-actions";
import WalletInfo from "./wallet-info/wallet-info";

class WalletContainer extends Component {
  componentDidMount() {
    this.props.fetchWallet();
  }

  render() {
    const { isPending, wallets } = this.props;

    if (isPending || wallets === undefined) {
      return null;
    }
    return <WalletInfo wallet={wallets[0]} />;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.walletData.wallet;

  let wallets;
  if (data) {
    wallets = data.wallets;
  }
  return { isPending, wallets, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchWallet: () => {
    dispatch(walletActions.fetchWallet());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletContainer);
