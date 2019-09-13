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
  const pnLCharts = profitChart.map(({ pnLChart }) => pnLChart);
  if (equityCharts.length === 0 || pnLCharts.length === 0 || !chartCurrencies)
    return null;
  const firstEquity = equityCharts[0].map(x => ({
    date: new Date(x.date).getTime(),
    value: formartChartMinValue(x.value)
  }));
  const firstPnl = pnLCharts[0]!.map((x: any) => ({
    date: new Date(x.date).getTime(),
    value: formartChartMinValue(x.value)
  }));
  const firstEquityValues = firstEquity.map(x => x.value);
  const off = gradientOffset(firstEquityValues);
  const areaStrokeColor = getStrokeColor(firstEquityValues);

  return (
    <ResponsiveContainer>
      <ComposedChart data={firstPnl} margin={{ top: 20 }}>
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
          yAxisId="left"
          dataKey="value"
          data={firstEquity}
          orientation="left"
          axisLine={false}
          tick={{
            fill: GVColors.$labelColor,
            fontSize: "12"
          }}
          tickFormatter={x => formatValue(x, 2)}
          unit="%"
          width={35}
        />
        {/*
        //@ts-ignore*/}
        <YAxis
          yAxisId="right"
          dataKey="value"
          data={firstPnl}
          orientation="right"
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          unit={chartCurrencies[0].name}
          tickFormatter={x => formatValue(x, 5)}
          width={80}
        />
        <Tooltip content={ProgramProfitTooltip} />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <Bar
          dataKey="value"
          //@ts-ignore
          data={firstPnl}
          unit={` ${chartCurrencies[0].name}`}
          barSize={6}
          fill={GVColors.$labelColor}
          stroke={GVColors.$labelColor}
          yAxisId="right"
          isAnimationActive={false}
        />
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
            yAxisId="left"
            unit="%"
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
