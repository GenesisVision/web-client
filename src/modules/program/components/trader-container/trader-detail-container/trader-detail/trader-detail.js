import React from "react";

import TraderInfo from "./trader-info/trader-info";
import TraderStatistic from "./trader-statistic/trader-statistic";
import TraderCharts from "./trader-charts/trader-charts";

const TraderDetail = ({
  trader,
  isAuthenticated,
  openInvestPopup,
  openWithdrawPopup
}) => {
  return (
    <div>
      <TraderInfo
        trader={trader}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
        openWithdrawPopup={openWithdrawPopup}
      />
      <TraderStatistic trader={trader} />
      <TraderCharts chart={trader.chart} profitDiagram={trader.profitDiagram} />
    </div>
  );
};

export default TraderDetail;
