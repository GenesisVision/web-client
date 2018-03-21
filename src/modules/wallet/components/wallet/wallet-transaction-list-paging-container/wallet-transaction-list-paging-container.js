import { connect } from "react-redux";
import React from "react";

import PagingContainer from "../../../../paging/components/paging/paging";
import walletActions from "../../../actions/wallet-actions";

const WalletTransactionListPagingContainer = ({
  paging,
  updatePaging,
  updatePagingAndFetch
}) => (
  <PagingContainer
    paging={paging}
    updatePaging={updatePaging}
    updatePagingAndFetch={updatePagingAndFetch}
  />
);

const mapStateToProps = state => {
  const { paging } = state.walletData.transactions;
  return { paging };
};

const mapDispatchToProps = dispatch => ({
  updatePaging: paging => {
    dispatch(walletActions.updateWalletTransactionsPaging(paging));
  },
  updatePagingAndFetch: paging => {
    dispatch(walletActions.updateWalletTransactionsPagingAndFetch(paging));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListPagingContainer
);
