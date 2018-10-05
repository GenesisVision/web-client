import "./program-simple-chart.scss";

import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ProgramSimpleChart = ({ data, isPositive }) => {
  if (data.length === 0) return null;
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: x.value
  }));
  const off = gradientOffset(programChartData.map(x => x.equity));
  return (
    <div className="program-simple-chart">
      <ResponsiveContainer>
        <AreaChart data={programChartData}>
          <defs>
            <ProgramChartGradient
              offset={off}
              name="equitySimpleChartFill"
              positiveColor={GVColors.$primaryColor}
              negativeColor={GVColors.$primaryColor}
              startOpacity={0.2}
              stopOpacity={0}
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
            stroke={GVColors.$primaryColor}
            strokeWidth={2}
            fill={`url(#equitySimpleChartFill)`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgramSimpleChart;
