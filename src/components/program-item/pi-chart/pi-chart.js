import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart
} from "recharts";

import "./pi-chart.css";

const PIChart = ({ data }) => {
  const wrapperStyle = { background: "rgba(255,255,255,0.6)" };
  const LineChartMargin = { top: 20, right: 40, left: 40, bottom: 5 };
  const interval = data.length - 2;
  return (
    <div className="pi-chart">
      <ResponsiveContainer>
        <LineChart
          data={data}
          stackOffset="sign"
          margin={LineChartMargin}
        >
          <XAxis dataKey="name" interval={interval} />
          <YAxis hide />
          <Tooltip
            offset={20}
            wrapperStyle={wrapperStyle}
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
