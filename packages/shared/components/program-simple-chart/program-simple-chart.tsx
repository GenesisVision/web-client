import "./program-simple-chart.scss";

import { SimpleChartPoint } from "gv-api-web";
import * as React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartGradient,
  getStrokeColor,
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";

const AREA_MARGIN = { left: 0, right: 0 };

const _ProgramSimpleChart: React.FC<Props> = ({ data, programId }) => {
  const programChartDataValues = data.map(({ value }) => value);
  const off = gradientOffset(programChartDataValues);
  const areaColor = getStrokeColor(programChartDataValues);
  return (
    <div className="program-simple-chart">
      <ResponsiveContainer>
        <AreaChart data={data} margin={AREA_MARGIN}>
          <defs>
            <ChartGradient
              offset={off}
              name={`equitySimpleChartFill__${programId}`}
              color={areaColor}
              startOpacity={0.2}
              stopOpacity={0.01}
            />
          </defs>
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            hide
          />
          <YAxis dataKey="value" axisLine={false} hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke={areaColor}
            strokeWidth={2}
            fill={`url(#equitySimpleChartFill__${programId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface Props {
  data: SimpleChartPoint[];
  programId: string;
}

const ProgramSimpleChart = React.memo(_ProgramSimpleChart);
export default ProgramSimpleChart;
