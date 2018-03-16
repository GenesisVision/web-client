import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import React from "react";
import moment from "moment";

import "./dashboard-chart.css";

const DashboardChart = ({ data }) => {
  const renderDashboard = () => {
    if (data.length === 0) return null;
    const data1 = data.map(x => ({
      amount: x.amount,
      date: moment(x.date).format("MMMM Do HH:mm")
    }));
    return (
      <div className="dashboard-chart">
        <div className="dashboard-chart__header">Profit chart</div>
        <ResponsiveContainer height={200}>
          <LineChart data={data1}>
            <XAxis
              dataKey="date"
              type="category"
              axisLine={false}
              interval={7}
            />
            <YAxis dataKey="amount" axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#03bdaf" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  return renderDashboard();
};

export default DashboardChart;
