import { connect } from "react-redux";
import React, { Component } from "react";
import programsService from "../../../service/programs-service";

import ProgramActiveFilterList from "./program-active-filter-list/program-active-filter-list";

import "./program-active-filter-list-container.css";

class ProgramActiveFilterListContainer extends Component {
  render() {
    const { filtering, openFilterPane, clearFilter, clearFilters } = this.props;
    const { filters } = filtering;
    return (
      <div className="program-active-filter-list-container">
        <ProgramActiveFilterList
          filters={filters}
          openFilterPane={openFilterPane}
          clearFilter={clearFilter}
          clearFilters={clearFilters}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { programs } = state.programsData;
  const { filtering } = programs;
  return { filtering };
};

const mapDispatchToProps = dispatch => ({
  openFilterPane: () => dispatch(programsService.openFilterPane()),
  clearFilter: filterName => () =>
    dispatch(programsService.clearProgramListFilter(filterName)),
  clearFilters: () => dispatch(programsService.clearProgramListFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramActiveFilterListContainer
);
