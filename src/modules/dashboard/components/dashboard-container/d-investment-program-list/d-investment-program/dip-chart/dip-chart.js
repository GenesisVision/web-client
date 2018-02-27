import React from "react";

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

const DIPChart = ({ data }) => {
  return (
    <ResponsiveContainer height="100%">
      <ComposedChart data={data} stackOffset="sign">
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

export default DIPChart;
