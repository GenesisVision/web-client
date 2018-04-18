import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart
} from "recharts";
import moment from "moment";

import "./pi-chart.css";

const PIChart = ({ data }) => {
  const tooltipWrapperStyle = { opacity: 0.9 };
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    value: x.value
  }));
  return (
    <div className="pi-chart">
      <ResponsiveContainer>
        <LineChart data={programChartData}>
          <XAxis
            dataKey="date"
            tickCount={3}
            domain={["dataMin", "dataMax"]}
            type="number"
            axisLine={false}
            tickFormatter={date => moment(date).format("MM/DD")}
          />
          <YAxis dataKey="value" tickCount={3} axisLine={false} />
          <Tooltip
            wrapperStyle={tooltipWrapperStyle}
            labelFormatter={date => moment(date).format("MMMM Do HH:mm")}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            dot={false}
            activeDot={{ stroke: "#184f61" }}
            isAnimationActive={false}
            stroke="#03bdaf"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PIChart;
