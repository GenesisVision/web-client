import React from "react";

import "./ti-chart.css";

import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from "recharts";

const TIChart = ({ data }) => {
  return (
    <div className="ti-chart">
      <ResponsiveContainer>
        <ComposedChart data={data} stackOffset="sign">
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Bar
            className="fund"
            dataKey="fund"
            stackId="stack"
            fill="#184f61"
            stroke="#184f61"
            isAnimationActive={false}
          />
          <Bar
            className="profit"
            dataKey="profit"
            stackId="stack"
            fill="#15bbaf"
            stroke="#184f61"
            isAnimationActive={false}
          />
          <Bar
            className="loss"
            dataKey="loss"
            stackId="stack"
            fill="#e00463"
            stroke="#184f61"
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
