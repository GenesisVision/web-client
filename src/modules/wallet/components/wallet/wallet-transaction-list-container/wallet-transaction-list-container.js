import { connect } from "react-redux";
import React, { Component } from "react";

import walletActions from "../../../actions/wallet-actions";
import WalletTransactionList from "./wallet-transaction-list/wallet-transaction-list";

class WalletTransactionListContainer extends Component {
  getFilter = props => (props.queryParams ? props.queryParams.filter : "All");

  componentWillMount() {
    this.props.fetchTransactions(this.getFilter(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.getFilter(this.props) !== this.getFilter(nextProps)) {
      this.props.fetchTransactions(this.getFilter(nextProps));
    }
  }

  render() {
    const { isPending, transactions } = this.props;

    if (isPending || transactions === undefined) {
      return null;
    }

    return <WalletTransactionList transactions={transactions.items} />;
  }
}
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
  fetchTransactions: filter => {
    dispatch(walletActions.fetchWalletTransactions(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListContainer
);
