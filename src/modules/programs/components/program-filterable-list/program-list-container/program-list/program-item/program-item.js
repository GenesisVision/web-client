import classnames from "classnames";
import React from "react";

import PTIButtons from "../../../../../../../components/program-item/pi-buttons/pi-buttons";
import PIChart from "../../../../../../../components/program-item/pi-chart/pi-chart";
import PIInfo from "../../../../../../../components/program-item/pi-info/pi-info";
import PIStatistic from "./pi-statistic/pi-statistic";
import { Link } from "react-router-dom";
import PIBookmark from "../../../../../../../components/program-item/pi-bookmark/pi-bookmark";

import "./program-item.css";

const ProgramItem = ({
  program,
  isAuthenticated,
  openInvestPopup,
  toggleFavoriteProgram
}) => {
  return (
    <div
      className={classnames("program-item", {
        "program-item--inactive": !program.isEnabled
      })}
    >
      <PIInfo
        order={program.order}
        program={program}
        isAuthenticated={isAuthenticated}
        toggleFavoriteProgram={toggleFavoriteProgram}
      />
      <div className="program-item__content">
        <div className="pi-info__name pi-name">
          <div className="pi-name__title">
            {isAuthenticated && (
              <PIBookmark
                isFavorite={program.isFavorite}
                onClick={toggleFavoriteProgram(program)}
              />
            )}
            <Link className="pi-name__link" to="">
              {program.title}
            </Link>
          </div>
          {/* <div className="pi-name__eop">{renderDaysLeft()}</div> */}
        </div>
        <PTIButtons
          programId={program.id}
          isInvestEnable={program.isInvestEnable}
          isAuthenticated={isAuthenticated}
          openInvestPopup={openInvestPopup}
        />
        <hr style={{ width: "100%" }} />
        <PIChart data={program.equityChart} />
        <PIStatistic trader={program} />
      </div>
    </div>
  );
};

export default ProgramItem;
