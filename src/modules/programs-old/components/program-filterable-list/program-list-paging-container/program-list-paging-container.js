import "./program-list-paging-container.css";

import React from "react";
import { connect } from "react-redux";

import Paging from "../../../../paging/components/paging/paging";
import programsService from "../../../service/programs-service";

const ProgramListPagingContainer = ({ paging, isPending, updatePaging }) => (
  <div className="program-list-paging-container">
    <Paging paging={paging} hide={isPending} updatePaging={updatePaging} />
  </div>
);

const mapStateToProps = ({ programsData }) => {
  const { paging } = programsData.programs;
  const { isPending } = programsData.programs.items;
  return { paging, isPending };
};

const mapDispatchToProps = dispatch => ({
  updatePaging: paging =>
    dispatch(programsService.changeProgramListPage(paging))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramListPagingContainer);
