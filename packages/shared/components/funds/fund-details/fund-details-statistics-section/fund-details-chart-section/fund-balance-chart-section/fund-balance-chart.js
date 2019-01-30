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

import FundBalanceTooltip from "./fund-balance-tooltip";

class FundBalanceChart extends PureComponent {
  render() {
    const { balanceChart, currency } = this.props;
    if (balanceChart.length === 0) return null;
    const chart = balanceChart.map(x => ({
      ...x,
      date: x.date.getTime()
    }));
    return (
      <ResponsiveContainer>
        <AreaChart data={chart} margin={{ top: 20 }}>
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
            connectNulls={true}
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
            connectNulls={true}
            fill={GVColors.$primaryColor}
            stroke={GVColors.$primaryColor}
            strokeWidth={2}
            dot={false}
            unit={currency}
            stackId="1"
            isAnimationActive={false}
          />
          <Tooltip content={FundBalanceTooltip} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default FundBalanceChart;
