import React from "react";

import DActiveProgram from "./di-active-program/di-active-program";
import DChart from "./dic-chart/dic-chart";

const DInvestmentsChart = ({ data }) => {
  return (
    <div className="row">
      <div className="col-6">
        <DChart data={data} />
      </div>
      <div className="col-6">
        <DActiveProgram />
      </div>
    </div>
  );
};

export default DInvestmentsChart;
