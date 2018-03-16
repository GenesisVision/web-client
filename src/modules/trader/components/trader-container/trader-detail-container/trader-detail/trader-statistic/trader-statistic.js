import React from "react";

import TSCards from "./ts-cards/ts-cards";
import TSShortStatistic from "./ts-short-statistic/ts-short-statistic";

const TraderStatistic = ({ trader }) => {
  return (
    <div>
      <TSShortStatistic trader={trader} />
      <TSCards trader={trader} />
    </div>
  );
};

export default TraderStatistic;
