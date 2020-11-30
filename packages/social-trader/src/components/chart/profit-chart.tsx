import { FundAssetPartWithIcon, SimpleChartPoint } from "gv-api-web";
import * as React from "react";
import {
  CartesianGrid,
  ComposedChart,
  ContentRenderer,
  Line,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis
} from "recharts";
import { $labelColor } from "utils/style/colors";

import chartXAxis from "./chart-components/chart-xaxis";
import { getStrokeColor } from "./chart-gradient/chart-gradient";

interface Props {
  tooltip?:
    | React.ReactElement
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

export type EquityChartElementType = SimpleChartPoint & {
  assets?: FundAssetPartWithIcon[];
};
export type EquityChartType = Array<EquityChartElementType>;

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

  const firstEquityValues = firstEquity.map(({ value }) => value);
  const areaStrokeColor = getStrokeColor(firstEquityValues);
  return (
    <ResponsiveContainer>
      <ComposedChart data={firstEquity} margin={{ top: 20 }}>
        {chartXAxis(
          firstEquityChart[0].date,
          firstEquityChart[firstEquity.length - 1].date
        )}
        <YAxis
          orientation="right"
          dataKey="value"
          axisLine={false}
          tick={{ fill: $labelColor, fontSize: "12" }}
          tickFormatter={(x: number) => +x.toFixed(2)}
          unit="%"
          width={35}
        />

        {tooltip && <Tooltip content={tooltip} />}
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        {equities.map((equity, i) => (
          <Line
            key={i}
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={colors && colors[i] ? colors[i].color : areaStrokeColor}
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

const ProfitChart = React.memo(_ProfitChart);
export default ProfitChart;
