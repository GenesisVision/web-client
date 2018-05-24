import { connect } from "react-redux";
import React from "react";

import { normalizeFilteringSelector } from "../../../../filtering/selectors/filtering-selectors";
import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import ProgramListFilter from "./program-list-filter/program-list-filter";
import programsService from "../../../service/programs-service";
import filterPaneActionsFactory from "../../../../filter-pane/actions/filter-pane-actions";
import { PROGRAMS } from "../../../actions/programs-actions.constants";

const filterPaneActions = filterPaneActionsFactory(PROGRAMS);

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
  const handleCloseFilterPane = e => {
    if (e.currentTarget === e.target) {
      closeFilterPane();
    }
  };
  return (
    <FilterPane isOpen={isFilterOpen}>
      <div
        className="program-filterable-list__filters"
        onClick={handleCloseFilterPane}
      >
        <ProgramListFilter
          filtering={filtering}
          onChangeComplete={handleFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>
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
  closeFilterPane: () => dispatch(filterPaneActions.closeFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramListFilterContainer
);
