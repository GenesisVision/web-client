import classnames from "classnames";
import React from "react";

// import PTIButtons from "../../../../../../../components/program-item/pi-buttons/pi-buttons";
import PIChart from "../../../../../../../components/program-item/pi-chart/pi-chart";
import PIInfo from "../../../../../../../components/program-item/pi-info/pi-info";
import PIStatistic from "./pi-statistic/pi-statistic";
import { Link } from "react-router-dom";
import PIBookmark from "../../../../../../../components/program-item/pi-bookmark/pi-bookmark";
import { PROGRAM_ROUTE } from "../../../../../../program/program.constants";
import { LOGIN_ROUTE } from "../../../../../../login/login.constants";
import replaceParams from "../../../../../../../utils/replace-params";
import Button from "../../../../../../../components/button/button";
import "./program-item.css";
import DaysLeft from "../../../../../../../components/program-item/pi-days-left/pi-days-left";
import PIAvatar from "../../../../../../../components/program-item/pi-avatar/pi-avatar";

const ProgramItem = ({
  program,
  isAuthenticated,
  openInvestPopup,
  toggleFavoriteProgram
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
      <div className="program-item__order">{program.order}</div>
      <Link to={programRoute}>
        <PIAvatar
          className="program-item__avatar"
          url={program.logo}
          level={program.level}
          isTournament={program.isTournament}
        />
      </Link>
      <div className="program-item__content">
        <div className="program-item__info">
          <div className="program-item__title">
            {isAuthenticated && (
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
        <hr />
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
          <PIStatistic trader={program} />
        </div>
      </div>
    </div>
  );
};

export default ProgramItem;
