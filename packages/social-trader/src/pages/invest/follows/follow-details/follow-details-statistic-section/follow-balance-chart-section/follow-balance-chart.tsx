import chartXAxis from "components/chart/chart-components/chart-xaxis";
import { BalanceChartElementType } from "components/details/details-statistic-section/details.chart.types";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import { $labelColor, $negativeColor } from "utils/style/colors";
import { CurrencyEnum } from "utils/types";

import FollowBalanceTooltip from "./follow-balance-tooltip";

const _FollowBalanceChart: React.FC<Props> = ({
  balanceChart,
  currency,
  color
}) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={balanceChart} margin={{ top: 20 }}>
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
            patternTransform="scale(2 2) rotate(30)"
          >
            <path d="M0,0 l0,4" stroke={$negativeColor} strokeWidth={1} />
          </pattern>
        </defs>
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
          dataKey="value"
          type="monotone"
          fill={color}
          stroke={color}
          strokeWidth={1}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Tooltip content={FollowBalanceTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface Props {
  color: string;
  balanceChart: BalanceChartElementType;
  currency: CurrencyEnum;
}

const FollowBalanceChart = React.memo(_FollowBalanceChart);
export default FollowBalanceChart;
