import ProgramChartGradient, {
  gradientOffset
} from "components/program-simple-chart/parogram-chart-gradient";
import { GVColors } from "gv-react-components";
import moment from "moment";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const DashboardPortfolioChart = ({ data }) => {
  if (data.length === 0) return null;

  const off = gradientOffset(
    data.filter(x => x.profitValue !== undefined).map(x => x.profitValue)
  );
  return (
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <defs>
          <defs>
            <ProgramChartGradient
              offset={off}
              name="dashboardPortfolioChartFill"
              positiveColor={GVColors.$primaryColor}
              negativeColor={GVColors.$primaryColor}
              startOpacity={0.2}
              stopOpacity={0}
            />
          </defs>
        </defs>
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
          dataKey="profitValue"
          labelFormatter={value => `${value}%`}
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
        />

        <Tooltip cursor={false} />
        <Area
          type="monotone"
          dataKey="profitValue"
          stroke={GVColors.$primaryColor}
          fill={`url(#dashboardPortfolioChartFill)`}
          connectNulls={true}
          /* isAnimationActive={false} */
        />

        {<Bar dataKey="assetValue" stackId="a" fill="#8884d8" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DashboardPortfolioChart;
