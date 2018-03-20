import { connect } from "react-redux";
import React, { PureComponent } from "react";

import walletActions from "../../../actions/wallet-actions";
import Pager from "react-pager";
class WalletTransactionListPagingContainer extends PureComponent {
  handlePageChanged = nextPage => {
    const paging = { ...this.props.paging };
    paging.currentPage = nextPage;
    this.props.fetchTransactions(this.props.propsfiltering, paging);
  };

  componentWillUnmount() {
    const paging = { ...this.props.paging };
    paging.currentPage = 0;
    this.props.updatePaging(paging);
  }

  render() {
    const { paging } = this.props;

    return (
      <Pager
        total={paging.totalPages}
        current={paging.currentPage}
        visiblePages={3}
        onPageChanged={nextPage => this.handlePageChanged(nextPage)}
      />
    );
  }
}
const mapStateToProps = state => {
  const paging = state.walletData.transactions.paging;
  const filtering = state.walletData.filter;
  return { paging };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactions: (filter, paging) => {
    dispatch(walletActions.fetchWalletTransactions(filter, paging));
  },
  updatePaging: paging => {
    dispatch(walletActions.updateWalletTransactionsPaging(paging));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListPagingContainer
);
