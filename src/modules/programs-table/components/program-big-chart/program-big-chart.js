import "./program-big-chart.scss";

import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
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

import ProgramBigChartTooltip from "./program-big-chart-tooltip";

const ProgramBigChart = ({ data, currency }) => {
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: x.value
  }));
  const off = gradientOffset(programChartData.map(x => x.equity));
  if (data.length === 0) return null;
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
        <Tooltip content={ProgramBigChartTooltip} />
        <defs>
          <ProgramChartGradient
            offset={off}
            name="equityChartStroke"
            positiveColor={GVColors.$positiveColor}
            negativeColor={GVColors.$negativeColor}
            startOpacity={1}
            stopOpacity={1}
          />
          <ProgramChartGradient
            offset={off}
            name="equityChartFill"
            positiveColor={GVColors.$positiveColor}
            negativeColor={GVColors.$negativeColor}
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
