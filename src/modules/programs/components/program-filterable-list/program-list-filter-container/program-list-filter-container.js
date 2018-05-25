import { connect } from "react-redux";
import React, { Component } from "react";

import { normalizeFilteringSelector } from "../../../../filtering/selectors/filtering-selectors";
import FilterPane from "../../../../filter-pane/components/filter-pane/filter-pane";
import ProgramListFilter from "./program-list-filter/program-list-filter";
import programsService from "../../../service/programs-service";
import filterPaneActionsFactory from "../../../../filter-pane/actions/filter-pane-actions";
import { PROGRAMS } from "../../../actions/programs-actions.constants";

const filterPaneActions = filterPaneActionsFactory(PROGRAMS);

class ProgramListFilterContainer extends Component {
  handleFilterChange = (name, type) => value => {
    this.props.onFilterChange({ name, type, value });
  };

  handleMouseDown = e => {
    this.target = e.target;
  };

  handleMouseUp = e => {
    if (e.currentTarget === this.target && e.target === this.target) {
      this.props.closeFilterPane();
    }
  };

  render() {
    const { isFilterOpen, filtering, closeFilterPane } = this.props;
    return (
      <FilterPane isOpen={isFilterOpen}>
        <div
          className="program-filterable-list__filters"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          <ProgramListFilter
            filtering={filtering}
            onChangeComplete={this.handleFilterChange}
            onClearFilters={this.onClearFilters}
          />
        </div>
      </FilterPane>
    );
  }
}

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
