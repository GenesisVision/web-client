import { GVColors } from "gv-react-components";
import React, { PureComponent } from "react";
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
import ProgramChartGradient, {
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";
import { getStrokeColor } from "shared/components/chart/chart-gradient/chart-gradient";
import { formatValue } from "shared/utils/formatter";

import ProgramProfitTooltip from "./program-profit-tooltip";

class ProgramProfitChart extends PureComponent {
  render() {
    const { equityChart, pnlChart, currency } = this.props;
    if (equityChart.length === 0 || pnlChart.length === 0) return null;
    const equity = equityChart.map(x => ({
      date: x.date.getTime(),
      value: formartChartMinValue(x.value)
    }));
    const pnl = pnlChart.map(x => ({
      date: x.date.getTime(),
      value: formartChartMinValue(x.value)
    }));
    const equityValues = equity.map(x => x.value);
    const off = gradientOffset(equityValues);
    const areaStrokeColor = getStrokeColor(equityValues);

    return (
      <ResponsiveContainer>
        <ComposedChart data={pnl}>
          <defs>
            <ProgramChartGradient
              offset={off}
              name="equityProgramChartFill"
              color={areaStrokeColor}
              startOpacity={0.1}
              stopOpacity={0.01}
            />
          </defs>
          {chartXAxis(
            equityChart[0].date,
            equityChart[equityChart.length - 1].date
          )}
          <YAxis
            yAxisId="left"
            dataKey="value"
            data={equity}
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
          <YAxis
            yAxisId="right"
            dataKey="value"
            data={pnl}
            orientation="right"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            unit={currency}
            tickFormatter={x => formatValue(x, 5)}
            width={60}
          />
          <Tooltip content={ProgramProfitTooltip} />
          <CartesianGrid vertical={false} strokeWidth={0.1} />
          <Bar
            dataKey="value"
            data={pnl}
            unit={` ${currency}`}
            barSize={6}
            fill={GVColors.$labelColor}
            stroke={GVColors.$labelColor}
            yAxisId="right"
            isAnimationActive={false}
          />
          <Area
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={areaStrokeColor}
            fill={`url(#equityProgramChartFill)`}
            strokeWidth={3}
            dot={false}
            yAxisId="left"
            unit="%"
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default ProgramProfitChart;
