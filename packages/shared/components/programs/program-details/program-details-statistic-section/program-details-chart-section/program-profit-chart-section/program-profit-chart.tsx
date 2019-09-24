import { ProgramProfitChart as ProgramProfitChartType } from "gv-api-web";
import * as React from "react";
import {
  Area,
  Bar,
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
import GVColors from "shared/components/gv-styles/gv-colors";
import { IDashboardAssetChart } from "shared/constants/constants";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { formatValue } from "shared/utils/formatter";

import ProgramProfitTooltip from "./program-profit-tooltip";

const _ProgramProfitChart: React.FC<Props> = ({
  profitChart,
  chartCurrencies
}) => {
  const equityCharts = profitChart.map(({ equityChart }) => equityChart);
  if (equityCharts.length === 0 || !chartCurrencies) return null;
  const firstEquity = equityCharts[0].map(x => ({
    date: x.date.getTime(),
    value: formartChartMinValue(x.value)
  }));
  const firstEquityValues = firstEquity.map(x => x.value);
  const off = gradientOffset(firstEquityValues);
  const areaStrokeColor = getStrokeColor(firstEquityValues);

  return (
    <ResponsiveContainer>
      <ComposedChart data={firstEquity} margin={{ top: 20 }}>
        <defs>
          <ChartGradient
            offset={off}
            name="equityProgramChartFill"
            color={areaStrokeColor}
            startOpacity={0.1}
            stopOpacity={0.01}
          />
        </defs>
        {chartXAxis(
          new Date(firstEquity[0].date),
          new Date(firstEquity[firstEquity.length - 1].date)
        )}
        {/*
        //@ts-ignore*/}
        <YAxis
          dataKey="value"
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(2)}
          unit="%"
          width={35}
        />
        <Tooltip content={ProgramProfitTooltip} />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        {equityCharts.map((equity, i) => (
          //@ts-ignore
          <Area
            key={i}
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={
              chartCurrencies && chartCurrencies[i]
                ? chartCurrencies[i].color
                : areaStrokeColor
            }
            fill={`url(#equityProgramChartFill)`}
            strokeWidth={3}
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
  profitChart: Array<ProgramProfitChartType | IDashboardAssetChart>;
  chartCurrencies?: TChartCurrency[];
}

const ProgramProfitChart = React.memo(_ProgramProfitChart);
export default ProgramProfitChart;
