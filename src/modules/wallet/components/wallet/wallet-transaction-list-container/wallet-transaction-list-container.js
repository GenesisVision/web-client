import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import React, { Component } from "react";

import walletActions from "../../../actions/wallet-actions";
import WalletTransactionFilter from "./wallet-transaction-filter/wallet-transaction-filter";
import WalletTransactionList from "./wallet-transaction-list/wallet-transaction-list";
import withQueryString from "../../../../../shared/hoc/with-query-string/with-query-string";

class WalletTransactionListContainer extends Component {
  getFilter = props => props.params.filter || "All";

  state = {
    filter: this.getFilter(this.props)
  };

  componentWillMount() {
    this.props.fetchTransactions(this.state.filter);
  }

  componentWillReceiveProps(nextProps) {
    const filter = this.getFilter(nextProps);
    if (this.state.filter !== filter) {
      this.setState({ filter: filter });
      this.props.fetchTransactions(filter);
    }
  }

  render() {
    const { params, isPending, transactions, fetchTransactions } = this.props;
    if (isPending) {
      return <WalletTransactionFilter />;
    }

    if (transactions === undefined) {
      return null;
    }

    return (
      <div>
        <WalletTransactionFilter />
        <WalletTransactionList transactions={transactions.items} />
      </div>
    );
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

export default withQueryString(
  connect(mapStateToProps, mapDispatchToProps)(WalletTransactionListContainer)
);
