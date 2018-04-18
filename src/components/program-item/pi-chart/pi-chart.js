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
  const tooltipWrapperStyle = { background: "rgba(255,255,255,0.6)" };
  const lineChartMargin = { top: 20, right: 40, left: 40, bottom: 5 };
  const interval = data.length - 2;
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    value: x.value
  }));
  return (
    <div className="pi-chart">
      <ResponsiveContainer>
        <LineChart data={programChartData} margin={lineChartMargin}>
          <XAxis
            dataKey="date"
            interval={interval}
            type="category"
            axisLine={false}
            tickFormatter={date => moment(date).format("MMMM Do")}
          />
          <YAxis dataKey="value" axisLine={false} />
          <Tooltip wrapperStyle={tooltipWrapperStyle} />
          <Line
            className="total-profit"
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PIChart;
