import { connect } from "react-redux";
import React from "react";

import { normalizeFilteringSelector } from "../../../../filtering/selectors/filtering-selectors";
import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import ProgramListFilter from "./program-list-filter/program-list-filter";
import programsService from "../../../service/programs-service";

const ProgramListFilterContainer = ({
  isFilterOpen,
  filtering,
  handleFilterChange
}) => {
  const onFilterChange = (name, type) => value => {
    handleFilterChange({ name, type, value });
  };
  return (
    <FilterPane
      isOpen={isFilterOpen}
      className="program-filterable-list__filters"
    >
      <ProgramListFilter
        filtering={filtering}
        onChangeComplete={onFilterChange}
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
  handleFilterChange: filter =>
    dispatch(programsService.changeProgramListFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramListFilterContainer
);
