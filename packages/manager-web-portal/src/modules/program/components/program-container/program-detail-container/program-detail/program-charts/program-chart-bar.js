import React from "react";

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from "recharts";

const ProgramChartBar = ({ data }) => {
  return (
    <ResponsiveContainer>
      <ComposedChart data={data} stackOffset="sign">
        <XAxis dataKey="date" hide />
        <YAxis hide />
        <Tooltip />
        <Bar
          className="manager-fund"
          dataKey="managerFund"
          fill="#184f61"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          className="investor-fund"
          dataKey="investorFund"
          fill="#aaa"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          className="profit"
          dataKey="profit"
          fill="#03bdaf"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          className="loss"
          dataKey="loss"
          fill="#e00463"
          stackId="stack"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ProgramChartBar;
