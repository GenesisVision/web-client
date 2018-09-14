import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient";
import ChartTooltip from "components/chart/chart-tooltip";
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

const BAR_COLORS = ["#5758A5", "#D7466C", "#DDD16E"];

const Body = ({ assets }) => {
  return assets.map((x, i) => (
    <div key={x.id}>
      <span style={{ color: BAR_COLORS[i] }}>o</span> {x.title}|{x.value}
    </div>
  ));
};

const DasboardPortfolioTooltip = ({
  active,
  label,
  payload,
  heading,
  body,
  date
}) => {
  if (!active) return null;
  const data = payload[0].payload;
  if (data.profitValue === undefined) {
    return (
      <ChartTooltip
        heading="Assets"
        body={<Body assets={data.assets} />}
        date={label}
      />
    );
  }
  return (
    <ChartTooltip
      heading="Total balance"
      body={data.profitValue}
      date={label}
    />
  );
};

class DashboardPortfolioChart extends PureComponent {
  state = {
    activeIndex: undefined
  };

  grOffset = () =>
    gradientOffset(
      this.props.data
        .filter(x => x.profitValue !== undefined)
        .map(x => x.profitValue)
    );

  handleBarMouseOver = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { data } = this.props;
    const { activeIndex } = this.state;
    if (data.length === 0) return null;

    return (
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <defs>
            <defs>
              <ProgramChartGradient
                offset={this.grOffset()}
                name="dashboardPortfolioChartFill"
                positiveColor={GVColors.$primaryColor}
                negativeColor={GVColors.$primaryColor}
                startOpacity={0.2}
                stopOpacity={0}
              />
            </defs>
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
          />

          <Tooltip cursor={false} content={DasboardPortfolioTooltip} />

          <Area
            type="monotone"
            dataKey="profitValue"
            stroke={GVColors.$primaryColor}
            fill={`url(#dashboardPortfolioChartFill)`}
            connectNulls={true}
            isAnimationActive={false}
          />
          {data[0].assets.map((x, i) => (
            <Bar
              key={`assets[${i}]`}
              dataKey={`assets[${i}].value`}
              stackId="bars"
              isAnimationActive={false}
              onMouseOver={this.handleBarMouseOver}
            >
              {data.map((entry, index) => (
                <Cell
                  fill={index === activeIndex ? BAR_COLORS[i] : "#49555B"}
                  key={`cell-${index}`}
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
