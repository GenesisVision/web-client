import React from "react";
import { connect } from "react-redux";

import programsService from "../../../service/programs-service";
import ProgramListSorting from "./program-list-sorting.js/program-list-sorting";

const ProgramSortingContainer = ({
  sorting,
  showFiltering,
  onSortingChange
}) => {
  if (!showFiltering) return null;
  return (
    <ProgramListSorting sorting={sorting} onSortingChange={onSortingChange} />
  );
};

const mapStateToProps = state => {
  const { sorting } = state.programsData.programs;
  const { data } = state.programsData.programs.items;
  const showFiltering = data && data.total > 0;
  return { sorting, showFiltering };
};

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting =>
    dispatch(programsService.changeProgramListSorting(sorting))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramSortingContainer);
