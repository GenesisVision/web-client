import chartXAxis from "components/chart/chart-components/chart-xaxis";
import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import React, { PureComponent } from "react";
import {
  Area,
  Bar,
  Cell,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";

import { BAR_COLORS } from "./dashboard-chart.constants";
import DasboardPortfolioTooltip from "./dashboard-portfoio-tooltip";

class DashboardPortfolioChart extends PureComponent {
  state = {
    activeIndex: undefined
  };

  grOffset = () =>
    gradientOffset(
      this.props.balance.filter(x => x.value !== undefined).map(x => x.value)
    );

  handleBarMouseOver = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { balance, assets } = this.props;

    if (balance.length === 0) return null;
    const { activeIndex } = this.state;
    const assetsCount = 10;

    return (
      <ResponsiveContainer>
        <ComposedChart stackOffset="sign" data={assets}>
          <defs>
            <ProgramChartGradient
              offset={this.grOffset()}
              name="dashboardPortfolioChartFill"
              color={GVColors.$primaryColor}
              startOpacity={0.05}
              stopOpacity={0.2}
            />
          </defs>
          {chartXAxis(
            new Date(balance[0].date),
            new Date(balance[balance.length - 1].date)
          )}
          <YAxis
            yAxisId="left"
            dataKey="balance"
            data={balance}
            orientation="left"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={x => x.toFixed(2)}
            unit="GVT"
            width={80}
          />
          <YAxis
            yAxisId="right"
            dataKey="value"
            data={assets}
            orientation="right"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            unit="GVT"
            tickFormatter={x => x.toFixed(2)}
            width={100}
          />
          <Area
            type="monotone"
            dataKey="balance"
            data={balance}
            stroke={GVColors.$primaryColor}
            fill={`url(#dashboardPortfolioChartFill)`}
            connectNulls={true}
            strokeWidth={2}
            yAxisId="left"
            isAnimationActive={false}
          />
          <Tooltip cursor={false} content={DasboardPortfolioTooltip} />
          {[...Array(assetsCount).keys()].map(idx => (
            <Bar
              dataKey={`asset${assetsCount - idx - 1}.value`}
              data={assets}
              stackId="bars"
              // isAnimationActive={false}
              barSize={15}
              yAxisId="right"
              onMouseOver={this.handleBarMouseOver}
              key={idx}
              isAnimationActive={false}
            >
              {assets.map((entry, index) => (
                <Cell
                  fill={
                    activeIndex === index
                      ? BAR_COLORS[assetsCount - idx - 1]
                      : GVColors.$labelColor
                  }
                  key={index}
                />
              ))}
            </Bar>
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default DashboardPortfolioChart;
