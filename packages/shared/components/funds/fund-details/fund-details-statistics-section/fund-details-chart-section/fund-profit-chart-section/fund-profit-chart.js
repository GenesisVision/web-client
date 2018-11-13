import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import chartXAxis from "shared/components/chart/chart-components/chart-xaxis";
import ProgramChartGradient, {
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";
import { getStrokeColor } from "shared/components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import React, { PureComponent } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";

import FundProfitTooltip from "./fund-profit-tooltip";

class FundProfitChart extends PureComponent {
  render() {
    const { equityChart } = this.props;
    if (!equityChart || equityChart.length === 0) return null;
    const equity = equityChart.map(x => ({
      date: x.date.getTime(),
      value: formartChartMinValue(x.value)
    }));

    const equityValues = equity.map(x => x.value);
    const off = gradientOffset(equityValues);
    const areaStrokeColor = getStrokeColor(equityValues);
    return (
      <ResponsiveContainer>
        <ComposedChart data={equity}>
          <defs>
            <ProgramChartGradient
              offset={off}
              name="equityProgramChartFill"
              color={areaStrokeColor}
              startOpacity={0.1}
              stopOpacity={0.01}
            />
          </defs>
          {chartXAxis(equityChart[0].date, equityChart[equity.length - 1].date)}
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
          <Area
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={areaStrokeColor}
            fill={`url(#equityProgramChartFill)`}
            strokeWidth={3}
            dot={false}
            unit=" %"
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default FundProfitChart;
