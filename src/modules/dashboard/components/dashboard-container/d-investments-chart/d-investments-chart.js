import React from "react";

import DChart from "./dic-chart/dic-chart";

const DInvestmentsChart = ({ data }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <DChart data={data} />
      </div>
      <div className="col-md-6">{/*<DActiveProgram />*/}</div>
    </div>
  );
};

export default DInvestmentsChart;
