import { GVColors } from "gv-react-components";
import React, { PureComponent } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import chartXAxis from "shared/components/chart/chart-components/chart-xaxis";

import ProgramBalanceTooltip from "./program-balance-tooltip";

class ProgramBalanceChart extends PureComponent {
  render() {
    const { balanceChart, currency } = this.props;
    if (balanceChart.length === 0) return null;
    const chart = balanceChart.map(x => {
      let dot = {
        managerFunds: x.managerFunds,
        investorsFunds: x.investorsFunds,
        date: x.date.getTime()
      };
      if (x.profit > 0) {
        dot.profit = x.profit;
      } else {
        dot.profitNegative = x.profit;
      }
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
            fill="#214650"
            stroke="#214650"
            strokeWidth={2}
            dot={false}
            unit={currency}
            stackId="1"
            isAnimationActive={false}
          />
          <Area
            dataKey="investorsFunds"
            type="monotone"
            fill={GVColors.$primaryColor}
            stroke={GVColors.$primaryColor}
            strokeWidth={2}
            dot={false}
            unit={currency}
            stackId="1"
            isAnimationActive={false}
          />
          <Area
            dataKey="profit"
            type="monotone"
            fill="#84d6d0"
            stroke="#84d6d0"
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
            stroke="#84d6d0"
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
  }
}

export default ProgramBalanceChart;
