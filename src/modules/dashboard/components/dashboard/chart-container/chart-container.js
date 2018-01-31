import { connect } from "react-redux";
import React from "react";
import Chart from "./chart/chart";

const ChartContainer = () => {
  return <Chart />;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
