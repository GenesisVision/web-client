import { connect } from "react-redux";
import React from "react";

import WalletTransactionList from "./wallet-transaction-list/wallet-transaction-list";
import walletActions from "../../../actions/wallet-actions";

const WalletTransactionListContainer = ({
  isPending,
  transactions,
  fetchTransactions
}) => {
  if (isPending) {
    return null;
  }

  if (transactions === undefined) {
    fetchTransactions();
    return null;
  }

  return <WalletTransactionList transactions={transactions.items} />;
};

const mapStateToProps = state => {
  const { isPending, data } = state.walletData.transactions;
  let transactions;
  if (data) {
    transactions = {
      items: data.transactions,
      total: data.total
    };
  }
  return { isPending, transactions };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactions: () => {
    dispatch(walletActions.fetchWalletTransactions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListContainer
);
