import chartXAxis from "components/chart/chart-components/chart-xaxis";
import { BalanceChartElementType } from "components/details/details-statistic-section/details.chart.types";
import { CURRENCIES } from "modules/currency-select/currency-select.constants";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ContentRenderer,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis
} from "recharts";
import { $labelColor } from "utils/style/colors";

interface Props {
  tooltip?:
    | React.ReactElement
    | React.StatelessComponent<any>
    | ContentRenderer<TooltipProps>;
  color: string;
  balanceChart: BalanceChartElementType;
  currency: CURRENCIES;
}

const _BalanceChart: React.FC<Props> = ({
  tooltip,
  color,
  balanceChart,
  currency
}) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={balanceChart} margin={{ top: 20 }}>
        {chartXAxis(
          balanceChart[0].date,
          balanceChart[balanceChart.length - 1].date
        )}
        <YAxis
          axisLine={false}
          orientation="right"
          tick={{ fill: $labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(4)}
          unit={currency}
          width={60}
        />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <Area
          dataKey="managerFunds"
          type="monotone"
          connectNulls={true}
          fill={`${color}2a`}
          stroke={`${color}2a`}
          strokeWidth={1}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="investorsFunds"
          type="monotone"
          connectNulls={true}
          fill={color}
          stroke={color}
          strokeWidth={1}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Tooltip content={tooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const BalanceChart = React.memo(_BalanceChart);
export default BalanceChart;
