import React from "react";

import ProgramChartBar from "./program-chart-bar";
import ProgramChartPie from "./program-chart-pie";

import "./program-charts.css";

const composeProfitChartData = profitDiagram => {
  return [
    {
      name: "Manager`s Fund",
      value: profitDiagram.managerFund,
      percent:
        profitDiagram.managerFund /
        (profitDiagram.managerFund + profitDiagram.investorsFund)
    },
    {
      name: "Investor`s Fund",
      value: profitDiagram.investorsFund,
      percent:
        profitDiagram.investorsFund /
        (profitDiagram.managerFund + profitDiagram.investorsFund)
    },
    {
      name: "Profit",
      value: profitDiagram.profitIsPositive && profitDiagram.profit,
      percent:
        profitDiagram.profit /
        (profitDiagram.managerFund + profitDiagram.investorsFund)
    },
    {
      name: "Loss",
      value: profitDiagram.profitIsPositive || profitDiagram.profit,
      percent:
        profitDiagram.profit /
        (profitDiagram.managerFund + profitDiagram.investorsFund)
    }
  ];
};

const ProgramCharts = ({ chart, profitDiagram }) => {
  return (
    <div className="program-charts">
      <div className="program-container__header">Last Periods</div>
      <div className="program-charts__charts">
        <div className="program-chart__bar">
          <ProgramChartBar data={chart} />
        </div>
        <div className="program-chart__pie">
          <ProgramChartPie data={composeProfitChartData(profitDiagram)} />
        </div>
      </div>
    </div>
  );
};

export default ProgramCharts;
