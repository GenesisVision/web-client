import "./program-big-chart.scss";

import { GVColors } from "gv-react-components";
import moment from "moment";
import React from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const gradientOffset = data => {
  const dataMax = Math.max(...data.map(i => i.equity));
  const dataMin = Math.min(...data.map(i => i.equity));

  if (dataMax <= 0) {
    return 0;
  } else if (dataMin >= 0) {
    return 1;
  } else {
    return dataMax / (dataMax - dataMin);
  }
};

const Gradient = ({ name, offset, startOpacity, stopOpacity }) => {
  return (
    <linearGradient id={name} x1="0" y1="0" x2="0" y2="1">
      <stop
        offset={0}
        stopColor={GVColors.$positiveColor}
        stopOpacity={startOpacity}
      />
      <stop
        offset={offset}
        stopColor={GVColors.$positiveColor}
        stopOpacity={stopOpacity}
      />
      <stop
        offset={offset}
        stopColor={GVColors.$negativeColor}
        stopOpacity={stopOpacity}
      />
      <stop
        offset={1}
        stopColor={GVColors.$negativeColor}
        stopOpacity={startOpacity}
      />
    </linearGradient>
  );
};

const TooltipContent = ({ active, label, payload }) => {
  if (!active) return null;

  return (
    <div className="tooltip">
      <div>Equity: {payload[0].value}%</div>
      <div>Date: {moment(label).format("ll")}</div>
    </div>
  );
};

const ProgramBigChart = ({ data }) => {
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: x.value
  }));
  const off = gradientOffset(programChartData);
  return (
    <ResponsiveContainer width="100%" className="program-big-chart">
      <AreaChart data={programChartData}>
        <ReferenceLine y={0} strokeDasharray="1 10" />
        <XAxis
          dataKey="date"
          domain={["dataMin", "dataMax"]}
          type="number"
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={date => moment(date).format("ll")}
          tickCount={10}
        />
        <YAxis
          dataKey="equity"
          labelFormatter={value => `${value}%`}
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
        />
        <Tooltip content={TooltipContent} />
        <defs>
          <Gradient
            offset={off}
            name="equityChartStroke"
            startOpacity={1}
            stopOpacity={1}
          />
          <Gradient
            offset={off}
            name="equityChartFill"
            startOpacity={0.3}
            stopOpacity={0}
          />
        </defs>
        <Area
          type="monotone"
          dataKey="equity"
          stroke={`url(#equityChartStroke)`}
          strokeWidth={2}
          fill={`url(#equityChartFill)`}
          isAnimationActive={false}
          activeDot={{ fill: "transparant" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProgramBigChart;
