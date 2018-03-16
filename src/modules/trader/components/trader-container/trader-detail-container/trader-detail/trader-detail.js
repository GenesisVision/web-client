import React from "react";

import TraderInfo from "./trader-info/trader-info";
import TraderStatistic from "./trader-statistic/trader-statistic";

const TraderDetail = ({ trader, isAuthenticated, openInvestPopup }) => {
  return (
    <div>
      <TraderInfo
        trader={trader}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
      <TraderStatistic trader={trader} />
    </div>
  );
};

export default TraderDetail;
