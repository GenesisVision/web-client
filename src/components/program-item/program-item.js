import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import PIChart from "./pi-chart/pi-chart";
import PIBookmark from "./pi-bookmark/pi-bookmark";
import { PROGRAM_ROUTE } from "../../modules/program/program.constants";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";
import replaceParams from "../../utils/replace-params";
import Button from "../button/button";
import "./program-item.css";
import PeriodLeft from "./period-left/period-left";
import PIAvatar from "./pi-avatar/pi-avatar";
import TagList from "./tag-list/tag-list";

const ProgramItem = ({
  program,
  isAuthenticated,
  openInvestPopup,
  toggleFavoriteProgram,
  statistic: Statistic,
  order,
  showBookmark = true
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
      <Link to={programRoute} className="program-item__avatar">
        <PIAvatar
          url={program.logo}
          level={program.level}
          isTournament={program.isTournament}
        />
      </Link>
      <div
        className={classnames("program-item__info", {
          "program-item__info--has-tags": (program.tags || []).length > 0
        })}
      >
        <div className="program-item__title">
          {showBookmark &&
            isAuthenticated && (
              <PIBookmark
                className="program-item__bookmark"
                isFavorite={program.isFavorite}
                onClick={toggleFavoriteProgram(program)}
              />
            )}
          <Link className="program-item__link" to={programRoute}>
            {program.title}
          </Link>
        </div>
      </div>
      <div className="program-item__tags">
        <TagList tags={program.tags || []} />
      </div>
      <div className="program-item__time-left">
        <PeriodLeft
          isEnabled={program.isEnabled}
          startOfPeriod={program.startOfPeriod}
          endOfPeriod={program.endOfPeriod}
        />
      </div>
      <div className="program-item__hr" />
      <div className="program-item__chart">
        <PIChart data={program.equityChart} />
      </div>
      <div className="program-item__buttons">
        <Button
          primary
          href={programRoute}
          className="program-item__button"
          label="View Profile"
        />
        <Button
          primary
          className="program-item__button"
          label="Invest"
          onClick={openInvestPopup(program.id)}
          href={isAuthenticated ? "" : LOGIN_ROUTE}
        />
      </div>
      <div className="program-item__stats">
        <Statistic trader={program} />
      </div>
    </div>
  );
};

export default ProgramItem;
