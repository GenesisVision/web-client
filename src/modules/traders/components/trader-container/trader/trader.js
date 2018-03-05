import React from "react";

import TraderInfo from "./trader-info/trader-info";
import TraderStatistic from "./trader-statistic/trader-statistic";

const Trader = ({ trader }) => {
  return (
    <div>
      <h1>{trader.title}</h1>
      <TraderInfo trader={trader} />
      <hr />
      <TraderStatistic trader={trader} />
    </div>
  );
};

export default Trader;
