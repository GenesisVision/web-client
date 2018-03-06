import React from "react";

import TIChart from "./ti-chart/ti-chart";
import TIInfo from "./ti-info/ti-info";
import TIStatistic from "./ti-statistic/ti-statistic";

const TraderItem = ({ trader }) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-1">
          <TIInfo trader={trader} />
        </div>
        <div className="col-3">
          <TIChart data={trader.chart} />
        </div>
        <div className="col-8">
          <TIStatistic trader={trader} />
        </div>
      </div>
    </div>
  );
};

export default TraderItem;
