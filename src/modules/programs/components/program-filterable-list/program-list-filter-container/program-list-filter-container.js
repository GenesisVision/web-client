import { connect } from "react-redux";
import React from "react";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import ProgramListFilter from "./program-list-filter/program-list-filter";
import programsService from "../../../service/programs-service";

const ProgramListFilterContainer = ({
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
      <ProgramListFilter
        filtering={filtering}
        onChangeComplete={onFilterChange}
      />
    </FilterPane>
  );
};

const mapStateToProps = state => {
  const { filterPane, programs } = state.programsData;
  const { isFilterOpen } = filterPane.state;
  const { filtering } = programs;
  return { isFilterOpen, filtering };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    dispatch(programsService.updateFiltering(filter));
  },
  closeFilter: () => {
    dispatch(programsService.closeFilterPane());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramListFilterContainer
);
