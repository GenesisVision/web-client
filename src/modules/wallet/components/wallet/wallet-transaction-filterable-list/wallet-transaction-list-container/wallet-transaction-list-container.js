import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import React, { Component } from "react";

import walletActions from "../../../../actions/wallet-actions";
import WalletTransactionFilter from "../wallet-transaction-filter-container/wallet-transaction-filter/wallet-transaction-filter";
import WalletTransactionList from "./wallet-transaction-list/wallet-transaction-list";
import withQueryString from "../../../../../../shared/hoc/with-query-string/with-query-string";

class WalletTransactionListContainer extends Component {
  getFilter = props => props.queryParams.filter || "All";

  componentWillMount() {
    this.props.fetchTransactions(this.getFilter(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.getFilter(this.props) !== this.getFilter(nextProps)) {
      this.props.fetchTransactions(this.getFilter(nextProps));
    }
  }

  render() {
    const { params, isPending, transactions, fetchTransactions } = this.props;

    if (isPending || transactions === undefined) {
      return null;
    }

    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListContainer
);
