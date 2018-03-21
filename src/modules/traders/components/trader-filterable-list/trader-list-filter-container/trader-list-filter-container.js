import { connect } from "react-redux";
import React from "react";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import filterPaneActions from "../../../../filter-pane/actions/filter-pane-actions";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import tradersActions from "../../../actions/traders-actions";

import { TRADERS_FILTER_PANE } from "../../../actions/traders-actions.constants";

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
    dispatch(filterPaneActions.closeFilter(TRADERS_FILTER_PANE));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderListFilterContainer
);
