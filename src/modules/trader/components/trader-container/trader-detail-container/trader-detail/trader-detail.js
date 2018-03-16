import React from "react";

import TraderInfo from "./trader-info/trader-info";
import TraderStatistic from "./trader-statistic/trader-statistic";

const TraderDetail = ({ trader, isAuthenticated }) => {
  return (
    <div>
      <TraderInfo trader={trader} isAuthenticated={isAuthenticated} />
      <TraderStatistic trader={trader} />
    </div>
  );
};

export default TraderDetail;
