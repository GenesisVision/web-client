import React from "react";

import TIButtons from "../../../../../../../components/trader-item/ti-buttons/ti-buttons";
import TIChart from "../../../../../../../components/trader-item/ti-chart/ti-chart";
import TIInfo from "../../../../../../../components/trader-item/ti-info/ti-info";
import DPStatistic from "./dp-statistic/dp-statistic";

import "./dp-trader-item.css";

const DPTraderItem = ({ idx, trader, isAuthenticated, openInvestPopup }) => {
  const traderChartData = trader.chart.map(x => ({
    fund: x.investorFund + x.managerFund,
    profit: x.prfit,
    loss: x.loss,
    totalProfit: x.totalProfit
  }));
  return (
    <div className="dp-trader-item">
      <TIInfo idx={idx} trader={trader} />
      <TIChart data={traderChartData} />
      <DPStatistic trader={trader} />
      <TIButtons
        traderId={trader.id}
        isInvestEnable={trader.isInvestEnable}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    </div>
  );
};

export default DPTraderItem;
