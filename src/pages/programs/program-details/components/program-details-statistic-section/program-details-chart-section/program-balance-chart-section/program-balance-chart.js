import { GVColors } from "gv-react-components";
import moment from "moment";
import React, { PureComponent } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import ProgramBalanceTooltip from "./program-balance-tooltip";

//import ProgramProfitTooltip from "./program-profit-tooltip";

class ProgramBalanceChart extends PureComponent {
  render() {
    const { balanceChart, currency } = this.props;
    if (balanceChart.length === 0) return null;
    const chart = balanceChart.map(x => ({
      ...x,
      date: x.date.getTime()
    }));
    return (
      <ResponsiveContainer>
        <AreaChart data={chart}>
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={(date, i) => moment(date).format("ll")}
            allowDuplicatedCategory={false}
            axisLine={false}
          />
          <YAxis
            axisLine={false}
            orientation="right"
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={x => x.toFixed(4)}
            unit={currency}
            width={80}
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
          />
          <Area
            dataKey="profit"
            type="monotone"
            connectNulls={true}
            fill="#84d6d0"
            stroke="#84d6d0"
            strokeWidth={2}
            dot={false}
            unit={currency}
            stackId="1"
          />
          <Tooltip content={ProgramBalanceTooltip} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default ProgramBalanceChart;
