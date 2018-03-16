import { ResponsiveContainer, LineChart, Line } from "recharts";
import React from "react";

const WPChart = ({ data }) => {
  return (
    data.length > 0 && (
      <ResponsiveContainer height={100}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#03bdaf"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  );
};

export default WPChart;
