import React from "react";

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from "recharts";

const TraderChartBar = ({ data }) => {
  return (
    <ResponsiveContainer>
      <ComposedChart data={data} stackOffset="sign">
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
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TraderChartBar;
