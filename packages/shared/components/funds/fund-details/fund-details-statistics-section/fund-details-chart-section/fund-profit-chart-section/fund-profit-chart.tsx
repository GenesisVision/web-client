import { ChartSimple } from "gv-api-web";
import { GVColors } from "gv-react-components";
import * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import chartXAxis from "shared/components/chart/chart-components/chart-xaxis";
import {
  ChartGradient,
  getStrokeColor,
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";

import FundProfitTooltip from "./fund-profit-tooltip";

const FundProfitChart: React.FC<Props> = ({ equityChart }) => {
  if (equityChart.length === 0) return null;
  const equity = equityChart.map(x => ({
    date: x.date.getTime(),
    value: formartChartMinValue(x.value)
  }));

  const equityValues = equity.map(x => x.value);
  const off = gradientOffset(equityValues);
  const areaStrokeColor = getStrokeColor(equityValues);
  return (
    <ResponsiveContainer>
      <ComposedChart data={equity} margin={{ top: 20 }}>
        <defs>
          <ChartGradient
            offset={off}
            name="equityProgramChartFill"
            color={areaStrokeColor}
            startOpacity={0.1}
            stopOpacity={0.01}
          />
        </defs>
        {chartXAxis(equityChart[0].date, equityChart[equity.length - 1].date)}
        <YAxis
          dataKey="value"
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(2)}
          unit="%"
          width={35}
        />

        <Tooltip content={FundProfitTooltip} />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        {/*
        //@ts-ignore*/}
        <Area
          dataKey="value"
          type="monotone"
          data={equity}
          connectNulls={true}
          stroke={areaStrokeColor}
          fill={`url(#equityProgramChartFill)`}
          strokeWidth={3}
          dot={false}
          unit=" %"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

interface Props {
  equityChart: ChartSimple[];
}

export default React.memo(FundProfitChart);
