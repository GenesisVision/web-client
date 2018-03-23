import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import React from "react";

import "./wallet-chart.css";

const WalletChart = ({ data }) => {
  const chartData = data.map(x => ({
    amount: x.amount,
    date: moment(x.date).format(" MMMM Do HH:mm ")
  }));
  return (
    <ResponsiveContainer height={100} className="wallet-chart">
      <LineChart data={chartData}>
        <XAxis dataKey="date" type="category" axisLine={false} />
        <YAxis dataKey="amount" axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#03bdaf" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WalletChart;
