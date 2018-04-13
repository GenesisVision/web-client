import classnames from "classnames";
import React from "react";

import TIButtons from "../../../../../../../components/program-item/pi-buttons/pi-buttons";
import TIChart from "../../../../../../../components/program-item/pi-chart/pi-chart";
import TIInfo from "../../../../../../../components/program-item/pi-info/pi-info";
import TIStatistic from "./pi-statistic/pi-statistic";

import "./program-item.css";

const ProgramItem = ({ idx, program, isAuthenticated, openInvestPopup }) => {
  const traderChartData = program.chart.map(x => ({
    fund: +(x.investorFund + x.managerFund).toFixed(8),
    profit: x.profit,
    loss: x.loss,
    totalProfit: x.totalProfit
  }));
  return (
    <div
      className={classnames("program-item", {
        "program-item--inactive": !program.isEnabled
      })}
    >
      <TIInfo idx={idx} trader={program} showTokensWidget />
      <TIChart data={traderChartData} />
      <TIStatistic trader={program} />
      <TIButtons
        programId={program.id}
        isInvestEnable={program.isInvestEnable}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    </div>
  );
};

export default ProgramItem;
