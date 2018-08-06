import "./program-active-filter-list-container.css";

import React, { Component } from "react";
import { connect } from "react-redux";

import programsService from "../../../service/programs-service";
import ProgramActiveFilterList from "./program-active-filter-list/program-active-filter-list";

class ProgramActiveFilterListContainer extends Component {
  render() {
    const {
      filtering,
      openFilterPane,
      clearFilter,
      clearFilters,
      disabled
    } = this.props;
    const { filters } = filtering;
    return disabled ? null : (
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
  const { filtering, items } = programs;
  return { filtering, disabled: !items.data };
};

const mapDispatchToProps = dispatch => ({
  openFilterPane: () => dispatch(programsService.openFilterPane()),
  clearFilter: filterName => () =>
    dispatch(programsService.clearProgramListFilter(filterName)),
  clearFilters: () => dispatch(programsService.clearProgramListFilters())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramActiveFilterListContainer);
