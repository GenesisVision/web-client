import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react";

import FilterPaneContainer from "../../../../filter-pane/components/filter-pane-container";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import tradersActions from "../../../actions/traders-actions";

const TraderListFilterContainer = ({ location, handleFilterChange }) => {
  const onFilterChange = name => value => {
    handleFilterChange({ name, value }, location);
  };
  return (
    <FilterPaneContainer>
      <TraderListFilter onChangeComplete={onFilterChange} />
    </FilterPaneContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: (filter, location) => {
    tradersActions.updateFilters(filter, location);
  }
});

export default withRouter(
  connect(null, mapDispatchToProps)(TraderListFilterContainer)
);
