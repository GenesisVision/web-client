import React from "react";

import TIButtons from "../../../../../../../components/trader-item/ti-buttons/ti-buttons";
import TIChart from "../../../../../../../components/trader-item/ti-chart/ti-chart";
import TIInfo from "../../../../../../../components/trader-item/ti-info/ti-info";
import TIStatistic from "./ti-statistic/ti-statistic";

import "./trader-item.css";

const TraderItem = ({ idx, trader, isAuthenticated, openInvestPopup }) => {
  return (
    <div className="trader-item">
      <TIInfo idx={idx} trader={trader} />
      <TIChart data={trader.chart} />
      <TIStatistic trader={trader} />
      <TIButtons
        traderId={trader.id}
        isInvestEnable={trader.isInvestEnable}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    </div>
  );
};

export default TraderItem;
