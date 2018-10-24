import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import moment from "moment";
import React, { PureComponent } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import FundProfitTooltip from "./fund-profit-tooltip";

class FundProfitChart extends PureComponent {
  render() {
    const { equityChart } = this.props;
    if (!equityChart || equityChart.length === 0) return null;
    const equity = equityChart.map(x => ({
      date: x.date.getTime(),
      value: x.value
    }));

    const off = gradientOffset(equity.map(x => x.value));
    return (
      <ResponsiveContainer>
        <ComposedChart data={equity}>
          <defs>
            <ProgramChartGradient
              offset={off}
              name="equityProgramChartStroke"
              positiveColor={GVColors.$positiveColor}
              negativeColor={GVColors.$negativeColor}
              startOpacity={1}
              stopOpacity={1}
            />
            <ProgramChartGradient
              offset={off}
              name="equityProgramChartFill"
              positiveColor={GVColors.$positiveColor}
              negativeColor={GVColors.$negativeColor}
              startOpacity={0.1}
              stopOpacity={0.01}
            />
          </defs>
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
            dataKey="value"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={x => x.toFixed(2)}
            unit="%"
            width={50}
          />

          <Tooltip content={FundProfitTooltip} />
          <CartesianGrid vertical={false} strokeWidth={0.1} />
          <Area
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={`url(#equityProgramChartStroke)`}
            fill={`url(#equityProgramChartFill)`}
            strokeWidth={3}
            dot={false}
            unit=" %"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default FundProfitChart;
