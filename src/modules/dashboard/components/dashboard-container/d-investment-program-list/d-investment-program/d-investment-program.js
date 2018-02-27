import React from "react";

import DIPChart from "./dip-chart/dip-chart";
import DIPInfo from "./dip-info/dip-info";
import DIPStatistic from "./dip-statistic/dip-statistic";

const DInvestmentProgram = ({ program, openDepositModal }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-md-1">
        <DIPInfo program={program} />
      </div>
      <div className="col-md-3">
        <DIPChart data={program.chart} />
      </div>
      <div className="col-md-8">
        <DIPStatistic program={program} openDepositModal={openDepositModal} />
      </div>
    </div>
  </div>
);

export default DInvestmentProgram;
