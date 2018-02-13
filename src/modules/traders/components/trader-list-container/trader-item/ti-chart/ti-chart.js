import React from "react";

import {
  BarChart,
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
const i = 1;
const data = [
  { name: "01/01", profit: 4000, funds: 2000, totalProfit: 4000 },
  { name: "01/05", profit: 0, funds: 2000, lost: -2000, totalProfit: 1000 },
  { name: "01/10", profit: 2000, funds: 2000, totalProfit: 3000 },
  { name: "01/15", profit: 2780, funds: 2000, totalProfit: 5780 },
  { name: "01/20", profit: 0, funds: 2000, lost: -1890, totalProfit: 3110 },
  { name: "01/25", profit: 2390, funds: 2000, totalProfit: 4280 },
  { name: "01/30", profit: 5490, funds: 2000, totalProfit: 9770 }
];
const data2 = [
  { name: "01/01", profit: 2000, funds: 2000, totalProfit: 2000 },
  { name: "01/05", profit: 2000, funds: 2000, totalProfit: 4000 },
  { name: "01/10", profit: 2000, funds: 2000, totalProfit: 6000 },
  { name: "01/15", profit: 2000, funds: 2000, totalProfit: 8000 },
  { name: "01/20", profit: 2000, funds: 2000, totalProfit: 10000 },
  { name: "01/25", profit: 2000, funds: 2000, totalProfit: 12000 },
  { name: "01/30", profit: 2000, funds: 2000, totalProfit: 14000 }
];
const TIChart = () => {
  return (
    <ResponsiveContainer height={120}>
      <ComposedChart
        data={(Math.random() * 10) % 2 > 1 ? data : data2}
        stackOffset="sign"
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Bar
          dataKey="funds"
          fill="#184f61"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          dataKey="profit"
          fill="#03bdaf"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          dataKey="lost"
          fill="red"
          stackId="stack"
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="totalProfit"
          stroke="#ff7300"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TIChart;
