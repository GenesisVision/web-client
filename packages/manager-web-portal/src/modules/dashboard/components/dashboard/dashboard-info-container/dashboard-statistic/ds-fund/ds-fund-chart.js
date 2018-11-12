import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import React from "react";

const DSFundChart = ({ data, colors }) => {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          dataKey="balanceUsd"
          data={data}
          innerRadius="60%"
          outerRadius="100%"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DSFundChart;
