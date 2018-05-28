import { connect } from "react-redux";
import React from "react";

import ProgramListSorting from "./program-list-sorting.js/program-list-sorting";
import programsService from "../../../service/programs-service";

const ProgramSortingContainer = ({ sorting, isPending, updateSorting }) => (
  <ProgramListSorting sorting={sorting} updateSorting={updateSorting} />
);

const mapStateToProps = ({ programsData }) => {
  const { sorting } = programsData.programs;
  const { isPending } = programsData.programs.items;
  return { sorting, isPending };
};

const mapDispatchToProps = dispatch => ({
  updatePaging: sorting =>
    dispatch(programsService.changeProgramListSort(sorting))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramSortingContainer
);
