import "./program-list-filter-container.css";

import React from "react";
import { connect } from "react-redux";

import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import { normalizeFilteringSelector } from "../../../../filtering/selectors/filtering-selectors";
import programsService from "../../../service/programs-service";
import ProgramFilters from "./program-list-filters/program-list-filters";

const ProgramListFilterContainer = ({
  isFilterOpen,
  filtering,
  onFilterChange,
  onClearFilters,
  closeFilterPane
}) => {
  const handleFilterChange = (name, type) => value => {
    onFilterChange({ name, type, value });
  };
  return (
    <FilterPane
      isOpen={isFilterOpen}
      className="program-list-filter-pane"
      onBackdropClick={closeFilterPane}
    >
      <ProgramFilters
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
  onClearFilters: () => dispatch(programsService.clearProgramListFilters()),
  closeFilterPane: () => dispatch(programsService.closeFilterPane())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramListFilterContainer
);
