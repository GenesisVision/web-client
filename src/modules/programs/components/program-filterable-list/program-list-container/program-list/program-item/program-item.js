import classnames from "classnames";
import React from "react";

import PTIButtons from "../../../../../../../components/program-item/pi-buttons/pi-buttons";
import PIChart from "../../../../../../../components/program-item/pi-chart/pi-chart";
import PIInfo from "../../../../../../../components/program-item/pi-info/pi-info";
import PIStatistic from "./pi-statistic/pi-statistic";

import "./program-item.css";

const ProgramItem = ({ program, isAuthenticated, openInvestPopup }) => {
  return (
    <div
      className={classnames("program-item", {
        "program-item--inactive": !program.isEnabled
      })}
    >
      <PIInfo order={program.order} program={program} showTokensWidget />
      <PIChart data={program.equityChart} />
      <PIStatistic trader={program} />
      <PTIButtons
        programId={program.id}
        isInvestEnable={program.isInvestEnable}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    </div>
  );
};

export default ProgramItem;
