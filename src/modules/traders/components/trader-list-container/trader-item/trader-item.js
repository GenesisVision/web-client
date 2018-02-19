import React from "react";
import TIChart from "./ti-chart/ti-chart";
import TIInfo from "./ti-info/ti-info";
import TIStatistic from "./ti-statistic/ti-statistic";

const TraderItem = () => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-2">
          <TIInfo />
        </div>
        <div className="col-3">
          <TIChart />
        </div>
        <div className="col-7">
          <TIStatistic />
        </div>
      </div>
    </div>
  );
};

export default TraderItem;
