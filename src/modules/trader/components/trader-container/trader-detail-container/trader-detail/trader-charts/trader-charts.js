import React from "react";

import TraderChartBar from "./trader-chart-bar";
import TraderChartPie from "./trader-chart-pie";

import "./trader-charts.css";

const TraderCharts = ({ chart, profitDiagram }) => {
  const profitChartData = [
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
  return (
    <div className="trader-charts">
      <div className="trader-container__header">Last Periods</div>
      <div className="trader-charts__charts">
        <div className="trader-chart__bar">
          <TraderChartBar data={chart} />
        </div>
        <div className="trader-chart__pie">
          <TraderChartPie data={profitChartData} />
        </div>
      </div>
    </div>
  );
};

export default TraderCharts;
