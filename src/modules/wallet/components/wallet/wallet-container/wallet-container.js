import { connect } from "react-redux";
import React from "react";

import walletActions from "../../../actions/wallet-actions";
import WalletInfo from "./wallet-info/wallet-info";

const WalletContainer = ({
  isPending,
  wallets,
  fetchWallet,
  showSuccessCopyMessage
}) => {
  if (isPending) {
    return null;
  }
  if (wallets === undefined) {
    fetchWallet();
    return null;
  }
  return <WalletInfo wallet={wallets[0]} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.walletData.wallet;

  let wallets;
  if (data) {
    wallets = data.wallets;
  }
  if (errorMessage !== "") {
    wallets = [];
  }
  return { isPending, wallets, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchWallet: () => {
    dispatch(walletActions.fetchWallet());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);
