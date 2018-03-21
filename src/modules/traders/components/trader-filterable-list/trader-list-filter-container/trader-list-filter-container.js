import { connect } from "react-redux";
import React from "react";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import tradersActions from "../../../actions/traders-actions";

const TraderListFilterContainer = ({
  isFilterOpen,
  filtering,
  handleFilterChange,
  closeFilter
}) => {
  const onFilterChange = name => value => {
    handleFilterChange({ name, value });
  };
  return (
    <FilterPane isOpen={isFilterOpen} onFilterClose={closeFilter}>
      <TraderListFilter
        filtering={filtering}
        onChangeComplete={onFilterChange}
      />
    </FilterPane>
  );
};

const mapStateToProps = state => {
  const { filterPane, traders } = state.tradersData;
  const { isFilterOpen } = filterPane.state;
  const { filtering } = traders;
  return { isFilterOpen, filtering };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    dispatch(tradersActions.updateFiltering(filter));
  },
  closeFilter: () => {
    dispatch(tradersActions.closeFilterPane());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderListFilterContainer
);
