import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import moment from "moment";
import React, { PureComponent } from "react";
import {
  Area,
  Bar,
  Cell,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

class ProgramProfitChart extends PureComponent {
  render() {
    const { periods, pnl } = this.props;
    if (periods.length === 0) return null;
    const chart = periods.reduce((accum, next) => {
      return accum.concat(
        next.map(x => ({ date: x.date.getTime(), value: x.value }))
      );
    }, []);
    return (
      <ResponsiveContainer>
        <ComposedChart data={chart}>
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={(date, i) => {
              var t = moment(date).format("ll");
              return t;
            }}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            width={20}
          />

          <Tooltip cursor={false} />

          {/* {periods.map((x, i) => ( */}
          <Area
            type="monotone"
            dataKey={`value`}
            stroke={GVColors.$primaryColor}
            // fill={`url(#dashboardPortfolioChartFill)`}
            connectNulls={true}
            isAnimationActive={false}
            strokeWidth={2}
          />
          {/* ))} */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default ProgramProfitChart;
