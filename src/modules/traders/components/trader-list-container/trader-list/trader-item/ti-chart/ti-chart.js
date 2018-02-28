import React from "react";

import "./ti-chart.css";

import {
  Bar,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from "recharts";
const data = [
  { name: "01/01", profit: 4000, fund: 2000, totalProfit: 4000 },
  { name: "01/05", profit: 0, fund: 2000, lose: -2000, totalProfit: 1000 },
  { name: "01/10", profit: 2000, fund: 2000, totalProfit: 3000 },
  { name: "01/15", profit: 2780, fund: 2000, totalProfit: 5780 },
  { name: "01/20", profit: 0, fund: 2000, lose: -1890, totalProfit: 3110 },
  { name: "01/25", profit: 2390, fund: 2000, totalProfit: 4280 },
  { name: "01/30", profit: 5490, fund: 2000, totalProfit: 9770 }
];
const data2 = [
  { name: "01/01", profit: 2000, fund: 2000, totalProfit: 2000 },
  { name: "01/05", profit: 2000, fund: 2000, totalProfit: 4000 },
  { name: "01/10", profit: 2000, fund: 2000, totalProfit: 6000 },
  { name: "01/15", profit: 2000, fund: 2000, totalProfit: 8000 },
  { name: "01/20", profit: 2000, fund: 2000, totalProfit: 10000 },
  { name: "01/25", profit: 2000, fund: 2000, totalProfit: 12000 },
  { name: "01/30", profit: 2000, fund: 2000, totalProfit: 14000 }
];

let i = 1;
const TIChart = () => {
  return (
    <ResponsiveContainer height="100%">
      <ComposedChart data={i++ % 2 ? data : data2} stackOffset="sign">
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Bar
          className="fund"
          dataKey="fund"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          className="profit"
          dataKey="profit"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          className="lose"
          dataKey="lose"
          stackId="stack"
          isAnimationActive={false}
        />
        <Line
          className="total-profit"
          type="monotone"
          dataKey="totalProfit"
          strokeWidth={3}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TIChart;
