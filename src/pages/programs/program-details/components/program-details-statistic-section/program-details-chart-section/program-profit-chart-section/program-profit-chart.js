import { formartChartMinValue } from "components/chart/chart-components/chart-components.helpers";
import chartXAxis from "components/chart/chart-components/chart-xaxis";
import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { getStrokeColor } from "components/chart/chart-gradient/chart-gradient";
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
            tickFormatter={x => x.toFixed(2)}
            unit="%"
            width={50}
          />
          <YAxis
            yAxisId="right"
            dataKey="value"
            data={pnl}
            orientation="right"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            unit={currency}
            tickFormatter={x => x.toFixed(4)}
            width={80}
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
            unit=" %"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default ProgramProfitChart;
