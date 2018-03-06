import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import React, { Component } from "react";

import walletActions from "../../../../actions/wallet-actions";
import WalletTransactionFilter from "../wallet-transaction-filter-container/wallet-transaction-filter/wallet-transaction-filter";

class WalletTransactionListContainer extends Component {
  componentWillMount() {
    this.props.fetchTransactionFilter();
  }

  render() {
    const { isPending, errorMessage, programs, queryParams } = this.props;
    if (isPending || programs === undefined) {
      return null;
    }

    return (
      <WalletTransactionFilter
        filter={queryParams}
        programs={programs.investmentPrograms}
      />
    );
  }
}
const mapStateToProps = state => {
  const {
    isPending,
    errorMessage,
    data
  } = state.walletData.transactionProgramFilters;
  let programs;
  if (data) {
    programs = data;
  }

  return { isPending, errorMessage, programs };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactionFilter: () => {
    dispatch(walletActions.fetchWalletTransactionProgramFilter());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListContainer
);
