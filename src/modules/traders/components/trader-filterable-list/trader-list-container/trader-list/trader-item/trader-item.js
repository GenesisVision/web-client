import classnames from "classnames";
import React from "react";

import TIButtons from "../../../../../../../components/program-item/pi-buttons/pi-buttons";
import TIChart from "../../../../../../../components/program-item/pi-chart/pi-chart";
import TIInfo from "../../../../../../../components/program-item/pi-info/pi-info";
import TIStatistic from "./ti-statistic/ti-statistic";

import "./trader-item.css";

const TraderItem = ({ idx, trader, isAuthenticated, openInvestPopup }) => {
  const traderChartData = trader.chart.map(x => ({
    fund: +(x.investorFund + x.managerFund).toFixed(8),
    profit: x.profit,
    loss: x.loss,
    totalProfit: x.totalProfit
  }));
  return (
    <div
      className={classnames("trader-item", {
        "trader-item--inactive": !trader.isEnabled
      })}
    >
      <TIInfo idx={idx} trader={trader} showTokensWidget />
      <TIChart data={traderChartData} />
      <TIStatistic trader={trader} />
      <TIButtons
        programId={trader.id}
        isInvestEnable={trader.isInvestEnable}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    </div>
  );
};

export default TraderItem;
