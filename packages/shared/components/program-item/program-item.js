import "./program-item.css";

import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { PROGRAM_ROUTE } from "../../modules/program/program.constants";
import replaceParams from "../../utils/replace-params";
import Button from "../button/button";
import PIAvatar from "../program-avatar/program-avatar";
import PIChart from "./pi-chart/pi-chart";
import DaysLeft from "./pi-days-left/pi-days-left";

const ProgramItem = ({
  program,
  isAuthenticated,
  openInvestPopup,
  toggleFavoriteProgram,
  statistic: Statistic,
  order,
  showBookmark = false
}) => {
  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });

  return (
    <div
      className={classnames("program-item", {
        "program-item--inactive": !program.isEnabled
      })}
    >
      <div className="program-item__order">{order || program.order}</div>
      <Link to={programRoute}>
        <PIAvatar
          className="program-item__avatar"
          url={program.logoSrc}
          level={program.level}
          isTournament={program.isTournament}
        />
      </Link>
      <div className="program-item__info">
        <div className="program-item__title">
          <Link className="program-item__link" to={programRoute}>
            {program.title}
          </Link>
        </div>
        <DaysLeft
          className="program-item__days-left"
          isEnabled={program.isEnabled}
          startOfPeriod={program.startOfPeriod}
          periodDuration={program.periodDuration}
        />
      </div>
      <div className="program-item__chart">
        <PIChart data={program.equityChart} />
      </div>
      <hr className="program-item__hr" />
      <div className="program-item__buttons">
        <Button
          primary
          href={programRoute}
          className="program-item__button"
          label="View Profile"
        />
      </div>
      <div className="program-item__stats">
        <Statistic program={program} />
      </div>
    </div>
  );
};

export default ProgramItem;
