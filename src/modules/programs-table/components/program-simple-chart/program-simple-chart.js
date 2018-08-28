import "./program-simple-chart.scss";

import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { NEGATIVE_COLOR, POSITIVE_COLOR } from "styles/colors";

const ProgramSimpleChart = ({ data, isPositive }) => {
  if (data.length === 0) return null;
  const color = isPositive ? POSITIVE_COLOR : NEGATIVE_COLOR;
  const gradient = `url(#${
    isPositive ? "positiveGradient" : "negativeGradient"
  }`;
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: x.value
  }));
  return (
    <div className="program-simple-chart">
      <ResponsiveContainer>
        <AreaChart data={programChartData}>
          <defs>
            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={POSITIVE_COLOR} stopOpacity={0.05} />
              <stop offset="95%" stopColor={POSITIVE_COLOR} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="5%" stopColor={NEGATIVE_COLOR} stopOpacity={0.05} />
              <stop offset="95%" stopColor={NEGATIVE_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            hide
          />
          <YAxis dataKey="equity" axisLine={false} hide />
          <Area
            type="monotone"
            dataKey="equity"
            stroke={color}
            fillOpacity={1}
            fill={gradient}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgramSimpleChart;
