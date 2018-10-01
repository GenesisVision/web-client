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
  state = {
    activeIndex: undefined
  };

  handleBarMouseOver = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { periods, pnl } = this.props;
    const { activeIndex } = this.state;
    if (periods.length === 0) return null;

    return (
      <ResponsiveContainer>
        <ComposedChart data={pnl}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={date => moment(date).format("ll")}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            width={20}
          />

          <Tooltip cursor={false} />

          {periods.map((x, i) => (
            <Area
              key={i}
              type="monotone"
              dataKey="profitValue"
              stroke={GVColors.$primaryColor}
              fill={`url(#dashboardPortfolioChartFill)`}
              connectNulls={true}
              isAnimationActive={false}
              strokeWidth={2}
            />
          ))}
          <Bar dataKey={`pnl`} stackId="bars" isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default ProgramProfitChart;
