import { connect } from "react-redux";
import React from "react";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import tradersActions from "../../../actions/traders-actions";

const TraderListFilterContainer = ({
  handleFilterChange,
  closeFilter,
  isFilterOpen
}) => {
  const onFilterChange = name => value => {
    handleFilterChange({ name, value });
  };
  return (
    <FilterPane isOpen={isFilterOpen} onFilterClose={closeFilter}>
      <TraderListFilter onChangeComplete={onFilterChange} />
    </FilterPane>
  );
};

const mapStateToProps = state => {
  const { isFilterOpen } = state.tradersData.filterPane.state;
  return { isFilterOpen };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    tradersActions.updateFilters(filter);
  },
  closeFilter: () => {
    dispatch(/*filterPaneActions.closeFilter()*/);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderListFilterContainer
);
