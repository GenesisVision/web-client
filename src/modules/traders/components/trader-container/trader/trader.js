import React from "react";

import TraderInfo from "./trader-info/trader-info";
import TraderStatistic from "./trader-statistic/trader-statistic";
import TraderDealList from "./trader-deal-list/trader-deal-list";

const Trader = ({ trader }) => {
  return (
    <div>
      <h1>{trader.title}</h1>
      <TraderInfo trader={trader} />
      <hr />
      <TraderStatistic trader={trader} />
      <hr />
      <TraderDealList />
    </div>
  );
};

export default Trader;
