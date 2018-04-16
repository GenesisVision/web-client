import { connect } from "react-redux";
import React, { PureComponent } from "react";

import Paging from "../../../../paging/components/paging/paging";
import walletService from "../../../service/wallet-service";

class WalletTransactionListPagingContainer extends PureComponent {
  componentWillUnmount() {
    this.props.clearPaging();
  }

  render() {
    const { paging, updatePaging } = this.props;
    return <Paging paging={paging} updatePaging={updatePaging} />;
  }
}

const mapStateToProps = state => {
  const { paging } = state.walletData.transactions;
  return { paging };
};

const mapDispatchToProps = dispatch => ({
  updatePaging: paging => {
    dispatch(walletService.changePage(paging));
  },
  clearPaging: () => dispatch(walletService.clearPaging())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListPagingContainer
);
