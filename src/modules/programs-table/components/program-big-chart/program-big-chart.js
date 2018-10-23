import "./program-big-chart.scss";

import chartXAxis from "components/chart/chart-components/chart-xaxis";
import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { getStrokeColor } from "components/chart/chart-gradient/chart-gradient";
import { ChartPeriodType } from "components/chart/chart-period/chart-period.helpers";
import { GVColors } from "gv-react-components";
import React from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";

import ProgramBigChartTooltip from "./program-big-chart-tooltip";

const ProgramBigChart = ({ programId, data }) => {
  if (data.length === 0) return null;
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: x.value
  }));

  const period = {
    start: data[0].date,
    end: data[data.length - 1].date,
    type: ChartPeriodType.week
  };
  const programChartDataValues = programChartData.map(x => x.equity);
  const off = gradientOffset(programChartDataValues);
  const areaStrokeColor = getStrokeColor(programChartDataValues);

  return (
    <ResponsiveContainer width="99%" height="99%" className="program-big-chart">
      <AreaChart data={programChartData}>
        <ReferenceLine y={0} strokeDasharray="1 10" />
        {chartXAxis(period)}
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
            name={`equityChartFill__${programId}`}
            color={areaStrokeColor}
            startOpacity={0.3}
            stopOpacity={0}
          />
        </defs>
        <Area
          type="monotone"
          dataKey="equity"
          stroke={areaStrokeColor}
          strokeWidth={2}
          fill={`url(#equityChartFill__${programId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProgramBigChart;
