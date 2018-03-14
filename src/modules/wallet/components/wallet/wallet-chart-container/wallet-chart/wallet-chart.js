import React from "react";
import { LineChart, Line } from "recharts";
import "./wallet-chart.css";

const WalletChart = ({ data }) => {
  const dataX = data.map(x => ({ x: x }));
  return (
    <LineChart width={300} height={100} data={dataX} className="wallet-chart">
      <Line
        type="monotone"
        dataKey="x"
        dot={false}
        className="wallet-chart__line"
      />
    </LineChart>
  );
};

export default WalletChart;
