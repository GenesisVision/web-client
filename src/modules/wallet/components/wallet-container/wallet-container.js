import { connect } from "react-redux";
import React from "react";

import walletActions from "../../actions/wallet-actions";
import WalletHistory from "../wallet-transaction-list-container/wallet-transaction-list-container";
import WalletInfo from "./wallet-info/wallet-info";

const WalletContainer = ({
  isPending,
  wallet,
  fetchWallet,
  showSuccessCopyMessage
}) => {
  if (isPending) {
    return null;
  }
  if (wallet === undefined) {
    fetchWallet();
    return null;
  }
  return (
    <div>
      <h1>Wallet</h1>
      <WalletInfo balance={wallet} />
      <WalletHistory />
    </div>
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.walletData;

  let wallet;
  if (data) {
    wallet = data;
  }
  if (errorMessage !== "") {
    wallet = {};
  }
  return { isPending, wallet, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchWallet: () => {
    dispatch(walletActions.fetchWallet());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);
