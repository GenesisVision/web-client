import {
  FundEquityChartElement,
  FundProfitChart as FundProfitChartType
} from "gv-api-web";
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
import GVColors from "shared/components/gv-styles/gv-colors";
import { IDashboardAssetChart } from "shared/constants/constants";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";

import FundProfitTooltip from "./fund-profit-tooltip";

const _FundProfitChart: React.FC<Props> = ({
  profitChart,
  chartCurrencies
}) => {
  const equityCharts = profitChart.map(({ equityChart }) => equityChart);
  const equities = equityCharts.map(equityChart =>
    (equityChart as FundEquityChartElement[]).map((item: any) => ({
      date: item.date.getTime(),
      value: formartChartMinValue(item.value),
      assets:
        [
          ...item.assetsState.assets,
          {
            icon: "",
            color: "grey",
            name: "other",
            asset: "other",
            percent: item.assetsState.otherPercent
          }
        ].filter(({ percent }) => !!percent) || []
    }))
  );
  const firstEquityChart = equityCharts[0];
  if (firstEquityChart.length === 0) return null;
  const firstEquity = equities[0];

  const firstEquityValues = firstEquity.map((x: any) => x.value);
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

        <Tooltip content={FundProfitTooltip} />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        {equities.map((equity, i) => (
          // @ts-ignore
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
  profitChart: Array<FundProfitChartType | IDashboardAssetChart>;
  chartCurrencies?: TChartCurrency[];
}

const FundProfitChart = React.memo(_FundProfitChart);
export default FundProfitChart;
