import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React, { PureComponent } from "react";

import FilterPaneContainer from "../../../../filter-pane/components/filter-pane-container";
import walletActions from "../../../actions/wallet-actions";
import WalletTransactionListFilter from "./wallet-transaction-list-filter/wallet-transaction-list-filter";

class TraderTransactionListFilterContainer extends PureComponent {
  render() {
    const {
      isPending,
      errorMessage,
      programs,
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
      <FilterPaneContainer>
        <WalletTransactionListFilter
          programs={programs.investmentPrograms}
          onChangeComplete={onFilterChange}
        />
        {errorMessage}
      </FilterPaneContainer>
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

  return { isPending, programs, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    //tradersActions.updateFilters(filter, location);
    console.log(filter);
  },
  fetchTransactionFilter: () => {
    dispatch(walletActions.fetchWalletTransactionProgramFilter());
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    TraderTransactionListFilterContainer
  )
);
