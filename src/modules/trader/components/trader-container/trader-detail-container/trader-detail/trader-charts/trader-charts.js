import React from "react";

import TraderChartBar from "./trader-chart-bar";
import TraderChartPie from "./trader-chart-pie";

import "./trader-charts.css";

const TraderCharts = ({ chart, profitDiagram }) => {
  const profitChartData = [
    {
      name: "Manager`s Fund",
      value: profitDiagram.managerFund
    },
    {
      name: "Investor`s Fund",
      value: profitDiagram.investorsFund
    },
    {
      name: "Profit",
      value: profitDiagram.profitIsPositive && profitDiagram.profit
    },
    {
      name: "Loss",
      value: profitDiagram.profitIsPositive || profitDiagram.profit
    }
  ];
  return (
    <div className="trader-charts">
      <div className="trader-charts__header">Last Periods</div>
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
