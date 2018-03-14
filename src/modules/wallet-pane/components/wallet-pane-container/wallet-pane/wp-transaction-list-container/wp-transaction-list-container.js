import { connect } from "react-redux";
import React, { Component } from "react";

import walletPaneActions from "../../../../actions/wallet-pane-actions";
import WPTransactionList from "./wp-transaction-list/wp-transaction-list";

class WPTransactionListContainer extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { transactions, isPending } = this.props;
    if (isPending || !transactions) {
      return <div>Loading...</div>;
    }

    return <WPTransactionList transactions={transactions} />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.walletPaneData.transactions;

  let transactions;
  if (data) {
    transactions = data.transactions;
  }
  return { isPending, transactions };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactions: () => {
    dispatch(walletPaneActions.fetchWalletPaneTransactions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WPTransactionListContainer
);
