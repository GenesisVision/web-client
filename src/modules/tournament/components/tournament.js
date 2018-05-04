import React from "react";
import TournamentTabsContainer from "./tournament-tabs-container/tournament-tabs-container";
import TournamentProgramsContainer from "./tournament-programs-container/tournament-programs-container";

const Tournament = () => {
  return (
    <div>
      <TournamentTabsContainer />
      <TournamentProgramsContainer />
    </div>
  );
};

export default Tournament;
