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

import { BAR_COLORS } from "../dashboard-chart.constants";
import DasboardPortfolioTooltip from "./dashboard-portfoio-tooltip";

class DashboardPortfolioChart extends PureComponent {
  state = {
    activeIndex: undefined
  };

  // grOffset = () =>
  //   gradientOffset(
  //     this.props.data
  //       .filter(x => x.profitValue !== undefined)
  //       .map(x => x.profitValue)
  //   );

  handleBarMouseOver = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { balanceChart, assetsChart } = this.props;
    const { activeIndex } = this.state;
    if (balanceChart.length === 0) return null;

    return (
      <ResponsiveContainer>
        <ComposedChart stackOffset="sign">
          <defs>
            <ProgramChartGradient
              offset={this.grOffset()}
              name="dashboardPortfolioChartFill"
              positiveColor={GVColors.$primaryColor}
              negativeColor={GVColors.$primaryColor}
              startOpacity={0.2}
              stopOpacity={0.05}
            />
          </defs>
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

          <Tooltip cursor={false} content={DasboardPortfolioTooltip} />

          <Area
            type="monotone"
            dataKey="profitValue"
            stroke={GVColors.$primaryColor}
            fill={`url(#dashboardPortfolioChartFill)`}
            connectNulls={true}
            isAnimationActive={false}
            strokeWidth={2}
          />
          {/* {data[0].assets.map((x, i) => (
            <Bar
              key={`assets[${i}]`}
              dataKey={`assets[${i}].value`}
              stackId="bars"
              isAnimationActive={false}
              onMouseOver={this.handleBarMouseOver}
            >
              {data.map((entry, index) => (
                <Cell
                  fill={
                    index === activeIndex
                      ? BAR_COLORS[i]
                      : GVColors.$textDarkColor
                  }
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          ))} */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default DashboardPortfolioChart;
