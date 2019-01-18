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
import chartXAxis from "shared/components/chart/chart-components/chart-xaxis";
import ProgramChartGradient, {
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";

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
        <ComposedChart stackOffset="sign" data={assets} margin={{ top: 20 }}>
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
            dataKey="balance"
            data={assets}
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={x => +x.toFixed(2)}
            unit="GVT"
            width={50}
          />
          <Area
            type="monotone"
            dataKey="balance"
            data={balance}
            stroke={GVColors.$primaryColor}
            fill={`url(#dashboardPortfolioChartFill)`}
            connectNulls={true}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Tooltip cursor={false} content={DasboardPortfolioTooltip} />
          {[...Array(assetsCount).keys()].map(idx => (
            <Bar
              dataKey={`asset${assetsCount - idx - 1}.value`}
              data={assets}
              stackId="bars"
              barSize={15}
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
