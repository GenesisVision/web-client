import classnames from "classnames";
import React from "react";

import DPStatistic from "./dp-statistic/dp-statistic";
import TIButtons from "../../../../../../../components/program-item/pi-buttons/pi-buttons";
import TIChart from "../../../../../../../components/program-item/pi-chart/pi-chart";
import TIInfo from "../../../../../../../components/program-item/pi-info/pi-info";

import "./dp-trader-item.css";

const DPTraderItem = ({ idx, trader, isAuthenticated, openInvestPopup }) => {
  return (
    <div
      className={classnames("dp-program-item", {
        "dp-trader-item--inactive": !trader.isEnabled
      })}
    >
      <TIInfo order={idx} program={trader} />
      <TIChart data={trader.equityChart} />
      <DPStatistic trader={trader} />
      <TIButtons
        programId={trader.id}
        isInvestEnable={trader.isInvestEnable}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    </div>
  );
};

export default DPTraderItem;
