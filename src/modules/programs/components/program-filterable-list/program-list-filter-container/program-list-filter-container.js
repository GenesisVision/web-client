import { connect } from "react-redux";
import React from "react";

import { normalizeFilteringSelector } from "../../../../filtering/selectors/filtering-selectors";
import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import ProgramListFilter from "./program-list-filter/program-list-filter";
import programsService from "../../../service/programs-service";

const ProgramListFilterContainer = ({
  isFilterOpen,
  filtering,
  onFilterChange,
  onClearFilters
}) => {
  const handleFilterChange = (name, type) => value => {
    onFilterChange({ name, type, value });
  };
  return (
    <FilterPane
      isOpen={isFilterOpen}
      className="program-filterable-list__filters"
    >
      <ProgramListFilter
        filtering={filtering}
        onChangeComplete={handleFilterChange}
        onClearFilters={onClearFilters}
      />
    </FilterPane>
  );
};

const mapStateToProps = state => {
  const { filterPane } = state.programsData;
  const { isFilterOpen } = filterPane.state;
  const filtering = normalizeFilteringSelector(state.programsData.programs);
  return { isFilterOpen, filtering };
};

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter =>
    dispatch(programsService.changeProgramListFilter(filter)),
  onClearFilters: () => dispatch(programsService.clearProgramListFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramListFilterContainer
);
