import React from "react";

import PSCards from "./ps-cards/ps-cards";
import PSShortStatistic from "./ps-short-statistic/ps-short-statistic";

const ProgramStatistic = ({ program }) => {
  return (
    <div>
      <PSShortStatistic program={program} />
      <PSCards program={program} />
    </div>
  );
};

export default ProgramStatistic;
