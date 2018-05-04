import classnames from "classnames";
import React from "react";

import "./tournament-tabs.css";

const TournamentTab = ({ isActive, text, onFilterChange }) => (
  <span
    className={classnames("tournament-tab", {
      "tournament-tab--active": isActive
    })}
    onClick={onFilterChange()}
  >
    {text}
  </span>
);

const TournamentTabs = ({ activeRound, onFilterChange }) => {
  const roundsCount = 4;

  return (
    <div className="tournament-tabs">
      {[...Array(roundsCount).keys()].map(x => (
        <TournamentTab
          key={x}
          text={`Round ${x + 1}`}
          isActive={activeRound === x + 1}
          onFilterChange={onFilterChange}
        />
      ))}
    </div>
  );
};

export default TournamentTabs;
