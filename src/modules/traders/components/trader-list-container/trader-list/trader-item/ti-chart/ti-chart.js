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

const TIChart = ({ data }) => {
  return (
    <div className="ti-chart">
      <ResponsiveContainer>
        <ComposedChart data={data.splice(0, 7)} stackOffset="sign">
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
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
            className="loss"
            dataKey="loss"
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
    </div>
  );
};

export default TIChart;
