import { connect } from "react-redux";
import Pager from "react-pager";
import React, { PureComponent } from "react";

import walletActions from "../../../actions/wallet-actions";

class WalletTransactionListPagingContainer extends PureComponent {
  handlePageChanged = nextPage => {
    const paging = { ...this.props.paging };
    paging.currentPage = nextPage;
    this.props.updatePaging(paging);
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
  return { paging, filtering };
};

const mapDispatchToProps = dispatch => ({
  updatePaging: paging => {
    dispatch(walletActions.updatePaging(paging));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListPagingContainer
);
