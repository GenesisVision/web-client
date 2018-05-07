import { Link } from "react-router-dom";
import React from "react";

import DaysLeftWidget from "../../days-left-widget/days-left-widget";
import PIBookmark from "../pi-bookmark/pi-bookmark";
import replaceParams from "../../../utils/replace-params";
import TraderAvatar from "../../program-item/pi-avatar/pi-avatar";

import "./pi-info.css";
import { PROGRAM_ROUTE } from "../../../modules/program/program.constants";

const PIInfo = ({ order, program, isAuthenticated, toggleFavoriteProgram }) => {
  const renderDaysLeft = () => {
    if (program.isEnabled) {
      return (
        <DaysLeftWidget
          start={program.startOfPeriod}
          duration={program.periodDuration}
        />
      );
    }

    return <div>The program is not enabled</div>;
  };

  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });

  return (
    <div className="pi-info">
      <div className="pi-info__order">{order}</div>
      <Link className="pi-info__image" to={programRoute}>
        <TraderAvatar
          url={program.logo}
          level={program.level}
          isTournament={program.isTournament}
        />
      </Link>
      <div className="pi-info__name pi-name">
        <div className="pi-name__title">
          {isAuthenticated && (
            <PIBookmark
              isFavorite={program.isFavorite}
              onClick={toggleFavoriteProgram(program)}
            />
          )}
          <Link className="pi-name__link" to={programRoute}>
            {program.title}
          </Link>
        </div>
        <div className="pi-name__eop">{renderDaysLeft()}</div>
      </div>
    </div>
  );
};

export default PIInfo;
