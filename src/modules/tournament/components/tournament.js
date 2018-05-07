import React from "react";

import TournamentPagingContainer from "./tournament-paging-container/tournament-paging-container";
import TournamentProgramsContainer from "./tournament-programs-container/tournament-programs-container";
import TournamentTabsContainer from "./tournament-tabs-container/tournament-tabs-container";

const Tournament = () => {
  return (
    <div>
      <TournamentTabsContainer />
      <TournamentProgramsContainer />
      <TournamentPagingContainer />
    </div>
  );
};

export default Tournament;
