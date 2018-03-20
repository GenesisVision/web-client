import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React, { PureComponent } from "react";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import filterPaneActions from "../../../../filter-pane/actions/filter-pane-actions";
import walletActions from "../../../actions/wallet-actions";
import WalletTransactionListFilter from "./wallet-transaction-list-filter/wallet-transaction-list-filter";

import { WALLET_FILTER_PANE } from "../../../actions/wallet-actions.constants";

class TraderTransactionListFilterContainer extends PureComponent {
  render() {
    const {
      isPending,
      errorMessage,
      isFilterOpen,
      programs,
      filtering,
      closeFilter,
      handleFilterChange,
      fetchTransactionFilter
    } = this.props;
    if (!isPending && !programs) {
      fetchTransactionFilter();
      return null;
    }

    if (isPending) {
      return null;
    }

    const onFilterChange = name => value => {
      handleFilterChange({ name, value });
    };
    return (
      <FilterPane isOpen={isFilterOpen} onFilterClose={closeFilter}>
        <WalletTransactionListFilter
          filtering={filtering}
          programs={programs.investmentPrograms}
          onChangeComplete={onFilterChange}
        />
        {errorMessage}
      </FilterPane>
    );
  }
}
const mapStateToProps = state => {
  const {
    isPending,
    errorMessage,
    data
  } = state.walletData.filtering.transactionPrograms;
  const { isFilterOpen } = state.walletData.filtering.filterPane;
  const { filtering } = state.walletData.transactions;
  let programs;
  if (data) {
    programs = data;
  }

  return { isPending, isFilterOpen, programs, filtering, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    dispatch(walletActions.updateFiltering(filter));
  },
  fetchTransactionFilter: () => {
    dispatch(walletActions.fetchWalletTransactionProgramFilter());
  },
  closeFilter: () => {
    dispatch(filterPaneActions.closeFilter(WALLET_FILTER_PANE));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    TraderTransactionListFilterContainer
  )
);
