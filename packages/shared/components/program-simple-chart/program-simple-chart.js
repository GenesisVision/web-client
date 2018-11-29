import "./program-simple-chart.scss";

import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ProgramChartGradient, {
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";
import { getStrokeColor } from "shared/components/chart/chart-gradient/chart-gradient";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const AREA_MARGIN = { left: 0, right: 0 };

const ProgramSimpleChart = ({ data, programId }) => {
  if (data.length === 0) return null;
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: formartChartMinValue(x.value)
  }));

  const programChartDataValues = programChartData.map(x => x.equity);
  const off = gradientOffset(programChartDataValues);
  const areaColor = getStrokeColor(programChartDataValues);

  return (
    <div className="program-simple-chart">
      <ResponsiveContainer>
        <AreaChart data={programChartData} margin={AREA_MARGIN}>
          <defs>
            <ProgramChartGradient
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
          <YAxis dataKey="equity" axisLine={false} hide />
          <Area
            type="monotone"
            dataKey="equity"
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

export default ProgramSimpleChart;
