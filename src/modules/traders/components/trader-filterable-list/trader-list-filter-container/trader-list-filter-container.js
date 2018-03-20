import { connect } from "react-redux";
import React from "react";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import tradersActions from "../../../actions/traders-actions";

const TraderListFilterContainer = ({ handleFilterChange, isFilterOpen }) => {
  const onFilterChange = name => value => {
    handleFilterChange({ name, value });
  };
  return (
    <FilterPane isOpen={isFilterOpen}>
      <TraderListFilter onChangeComplete={onFilterChange} />
    </FilterPane>
  );
};

const mapStateToProps = state => {
  const { isFilterOpen } = state.tradersData.filtering.filterPane;
  return { isFilterOpen };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    tradersActions.updateFilters(filter);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderListFilterContainer
);
