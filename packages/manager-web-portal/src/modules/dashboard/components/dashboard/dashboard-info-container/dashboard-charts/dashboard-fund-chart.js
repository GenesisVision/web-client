import React from "react";

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from "recharts";

const DashboardFundChart = ({ data }) => {
  return (
    <ResponsiveContainer height={400} stackOffset="sign">
      <ComposedChart data={data}>
        <XAxis dataKey="title" axisLine={false} />
        <YAxis hide />
        <Tooltip />
        <Bar
          className="manager-fund"
          dataKey="managerFund"
          fill="#184f61"
          stackId="stack"
          maxBarSize={40}
          isAnimationActive={false}
        />
        <Bar
          className="investor-fund"
          dataKey="investorFund"
          fill="#aaa"
          stackId="stack"
          maxBarSize={40}
          isAnimationActive={false}
        />
        <Bar
          className="profit"
          dataKey="profit"
          fill="#03bdaf"
          stackId="stack"
          maxBarSize={40}
          isAnimationActive={false}
        />
        <Bar
          className="loss"
          dataKey="loss"
          fill="#e00463"
          stackId="stack"
          maxBarSize={40}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DashboardFundChart;
