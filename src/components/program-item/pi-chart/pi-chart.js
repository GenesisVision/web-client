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
            tickCount={3}
            domain={["dataMin", "dataMax"]}
            type="number"
            axisLine={false}
            tickFormatter={date => moment(date).format("MMMM Do")}
          />
          <YAxis dataKey="value" axisLine={false} hide />
          <Tooltip
            wrapperStyle={tooltipWrapperStyle}
            labelFormatter={date => moment(date).format("MMMM Do HH:mm")}
          />
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
