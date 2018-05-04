import { connect } from "react-redux";
import React from "react";

import Paging from "paging/components/paging/paging";
//import programsService from "../../../service/programs-service";

//import "./program-list-paging-container.css";

const TournamentPagingContainer = ({ paging, isPending, updatePaging }) => (
  <div className="tournament-paging-container">
    <Paging paging={paging} hide={isPending} updatePaging={updatePaging} />
  </div>
);

const mapStateToProps = ({ programsData }) => {
  const { paging } = programsData.programs;
  const { isPending } = programsData.programs.items;
  return { paging, isPending };
};

const mapDispatchToProps = dispatch => ({
  /*updatePaging: paging =>
    dispatch(tournamentService.changeProgramListPage(paging))*/
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TournamentPagingContainer
);
