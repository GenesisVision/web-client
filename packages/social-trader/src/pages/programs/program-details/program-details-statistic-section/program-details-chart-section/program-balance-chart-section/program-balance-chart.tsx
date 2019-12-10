import chartXAxis from "components/chart/chart-components/chart-xaxis";
import { BalanceChartElementType } from "components/details/details-statistic-section/details.chart.types";
import GVColors from "components/gv-styles/gv-colors";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import { CurrencyEnum } from "utils/types";

import ProgramBalanceTooltip from "./program-balance-tooltip";

const _ProgramBalanceChart: React.FC<Props> = ({
  balanceChart,
  currency,
  color
}) => {
  const chart = balanceChart.map(x => {
    let dot = {
      profit: 0,
      profitNegative: 0,
      managerFunds: x.managerFunds,
      investorsFunds: x.investorsFunds,
      date: new Date(x.date).getTime()
    };
    /*if (x.profit > 0) {
      dot.profit = x.profit;
    } else {
      dot.profitNegative = x.profit;
    }*/
    return dot;
  });
  return (
    <ResponsiveContainer>
      <AreaChart data={chart} margin={{ top: 20 }}>
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
            patternTransform="scale(2 2) rotate(30)"
          >
            <path
              d="M0,0 l0,4"
              stroke={GVColors.$negativeColor}
              strokeWidth={2}
            />
          </pattern>
        </defs>
        {chartXAxis(
          balanceChart[0].date,
          balanceChart[balanceChart.length - 1].date
        )}
        <YAxis
          axisLine={false}
          orientation="right"
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(4)}
          unit={currency}
          width={60}
        />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <Area
          dataKey="managerFunds"
          type="monotone"
          fill={`${color}2a`}
          stroke={`${color}2a`}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="investorsFunds"
          type="monotone"
          fill={color}
          stroke={color}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="profit"
          type="monotone"
          fill={`${color}2a`}
          stroke={`${color}2a`}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="profitNegative"
          type="monotone"
          fill="url(#diagonalHatch)"
          stroke={color}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Tooltip content={ProgramBalanceTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface Props {
  color: string;
  balanceChart: BalanceChartElementType;
  currency: CurrencyEnum;
}

const ProgramBalanceChart = React.memo(_ProgramBalanceChart);
export default ProgramBalanceChart;
