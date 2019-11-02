import { ChartSimple, FundAssetsState } from "gv-api-web";
import * as React from "react";
import {
  Area,
  ComposedChart,
  ContentRenderer,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis
} from "recharts";
import GVColors from "shared/components/gv-styles/gv-colors";

import chartXAxis from "./chart-components/chart-xaxis";
import { getStrokeColor } from "./chart-gradient/chart-gradient";

const _ProfitChart: React.FC<Props> = ({
  tooltip,
  equities,
  equityCharts,
  colors
}) => {
  const firstEquityChart = equityCharts[0];
  if (firstEquityChart.length === 0 || equityCharts.length === 0 || !colors)
    return null;
  const firstEquity = equities[0];

  const firstEquityValues = firstEquity.map(x => x.value);
  const areaStrokeColor = getStrokeColor(firstEquityValues);
  return (
    <ResponsiveContainer>
      <ComposedChart data={firstEquity} margin={{ top: 20 }}>
        {chartXAxis(
          firstEquityChart[0].date,
          firstEquityChart[firstEquity.length - 1].date
        )}
        <YAxis
          dataKey="value"
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(2)}
          unit="%"
          width={35}
        />

        {tooltip && <Tooltip content={tooltip} />}
        {equities.map((equity, i) => (
          // @ts-ignore
          <Area
            key={i}
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={colors && colors[i] ? colors[i].color : areaStrokeColor}
            fill={`url(#equityProgramChartFill)`}
            strokeWidth={1}
            dot={false}
            unit=" %"
            isAnimationActive={false}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

interface Props {
  tooltip?:
    | React.ReactElement<any>
    | React.StatelessComponent<any>
    | ContentRenderer<TooltipProps>;
  equityCharts: EquityChartType[];
  equities: EquityChartType[];
  colors?: TChartColor[];
}

export type TChartColor = {
  name?: string;
  color: string;
};

export type EquityChartElementType = ChartSimple & {
  assetsState?: FundAssetsState;
};
export type EquityChartType = Array<EquityChartElementType>;

const ProfitChart = React.memo(_ProfitChart);
export default ProfitChart;
