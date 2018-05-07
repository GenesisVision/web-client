import classnames from "classnames";
import React from "react";

import "./tournament-tabs.css";

const TournamentTab = ({ roundNo, activeRound, onFilterChange }) => (
  <span
    className={classnames("tournament-tab", {
      "tournament-tab--active": activeRound === roundNo
    })}
    onClick={onFilterChange(roundNo)}
  >
    {`Round ${roundNo}`}
  </span>
);

const TournamentTabs = ({ activeRound, roundsCount, onFilterChange }) => {
  return (
    <div className="tournament-tabs">
      {[...Array(roundsCount).keys()].map(x => (
        <TournamentTab
          key={x}
          roundNo={x + 1}
          activeRound={activeRound}
          onFilterChange={onFilterChange}
        />
      ))}
    </div>
  );
};

export default TournamentTabs;
