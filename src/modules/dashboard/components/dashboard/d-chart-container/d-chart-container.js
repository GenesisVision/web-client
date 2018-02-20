import { connect } from "react-redux";
import React from "react";
import DChart from "./d-chart/d-chart";
import DActiveProgram from "./d-active-program/d-active-program";

const DChartContainer = ({ data }) => {
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

const mapStateToProps = state => {
  const data = [
    { name: "Program A", value: 800 },
    { name: "Pragram B", value: 300 },
    { name: "Pragram C", value: 300 },
    { name: "Pragram D", value: 200 }
  ];
  return { data };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DChartContainer);
