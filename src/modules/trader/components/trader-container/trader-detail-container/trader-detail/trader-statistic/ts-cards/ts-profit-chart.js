import { ResponsiveContainer, LineChart, Line } from "recharts";
import React from "react";

const TSProfitChart = ({ data }) => {
  return (
    data.length > 0 && (
      <ResponsiveContainer height={100}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="totalProfit"
            stroke="#03bdaf"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  );
};

export default TSProfitChart;
