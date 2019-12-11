import "./program-big-chart.scss";

import { formartChartMinValue } from "components/chart/chart-components/chart-components.helpers";
import chartXAxis from "components/chart/chart-components/chart-xaxis";
import {
  ChartGradient,
  getStrokeColor,
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import GVColors from "components/gv-styles/gv-colors";
import { SimpleChartPoint } from "gv-api-web";
import * as React from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";

import ProgramBigChartTooltip from "./program-big-chart-tooltip";

const _ProgramBigChart: React.FC<Props> = ({ programId, data }) => {
  const programChartData = data.map(x => ({
    date: new Date(x.date).getTime(),
    equity: formartChartMinValue(x.value)
  }));
  const programChartDataValues = programChartData.map(x => x.equity);
  const off = gradientOffset(programChartDataValues);
  const areaStrokeColor = getStrokeColor(programChartDataValues);

  return (
    <ResponsiveContainer width="99%" height="99%" className="program-big-chart">
      <AreaChart data={programChartData} margin={{ top: 20 }}>
        <ReferenceLine y={0} strokeDasharray="1 10" />
        {chartXAxis(data[0].date, data[data.length - 1].date)}
        {/*
        //@ts-ignore*/}
        <YAxis
          dataKey="equity"
          // @ts-ignore
          labelFormatter={(value: any) => `${value}%`}
          axisLine={false}
          width={30}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
        />
        <Tooltip content={ProgramBigChartTooltip} />
        <defs>
          <ChartGradient
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
          strokeWidth={1}
          fill={`url(#equityChartFill__${programId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface Props {
  data: SimpleChartPoint[];
  programId: string;
}

const ProgramBigChart = React.memo(_ProgramBigChart);
export default ProgramBigChart;
