import { connect } from "react-redux";
import React from "react";

import Paging from "../../../paging/components/paging/paging";
import tournamentService from "../../service/tournament-service";

import "./tournament-paging-container.css";

const TournamentPagingContainer = ({ paging, isPending, updatePaging }) => (
  <div className="tournament-paging-container">
    <Paging paging={paging} hide={isPending} updatePaging={updatePaging} />
  </div>
);

const mapStateToProps = ({ tournamentData }) => {
  const { paging } = tournamentData.programs;
  const { isPending } = tournamentData.programs.items;
  return { paging, isPending };
};

const mapDispatchToProps = dispatch => ({
  updatePaging: paging =>
    dispatch(tournamentService.changeProgramListPage(paging))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TournamentPagingContainer
);
