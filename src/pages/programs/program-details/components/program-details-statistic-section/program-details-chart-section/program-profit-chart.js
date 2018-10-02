import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import moment from "moment";
import React, { Fragment, PureComponent } from "react";
import {
  Area,
  Bar,
  BarChart,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const composeSeries = periods => {
  if (periods.length === 0) return null;
  for (let i = 1; i < periods.length; i++) {
    const prevPeriodLength = periods[i - 1].length;
    periods[i].unshift(periods[i - 1][prevPeriodLength - 1]);
  }

  const series = periods.map((x, i) => ({
    name: "A" + i,
    data: x.map(p => ({
      date: p.date.getTime(),
      value: Math.random(),
      pnl: Math.random()
    }))
  }));

  return series;
};

const composeReferences = periods => {};

const composePnl = periods => {
  const pnl = periods.reduce((accum, next) => {
    return accum.concat(
      next.map(x => ({ date: x.date.getTime(), value: Math.random() }))
    );
  }, []);
  return pnl;
};

class ProgramProfitChart extends PureComponent {
  state = {
    period: 0,
    series: composeSeries(this.props.periods),
    pnl: composePnl(this.props.periods),
    references: composeReferences()
  };

  handleClick = index => () => {
    this.setState({
      period: index
    });
  };

  render() {
    const { periods } = this.props;
    const { series, pnl } = this.state;
    if (periods.length === 0 || periods[0].length === 0) return null;
    return (
      <Fragment>
        <BarChart width={150} height={40} data={pnl}>
          <XAxis dataKey="date" type="number" domain={["dataMin", "dataMax"]} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
        {/* <ResponsiveContainer> */}
        <BarChart width={950} height={200} data={pnl}>
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={(date, i) => {
              var t = moment(date).format("lll");
              return t;
            }}
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="value" />
          <Tooltip cursor={false} />
          {/* <Bar dataKey="value" fill="#8884d8" /> */}
          {/* {series.map((s, idx) => (
              <Line
                dataKey="value"
                type="monotone"
                data={s.data}
                key={s.name}
                name={s.name}
                connectNulls={true}
                isAnimationActive={false}
                stroke={
                  this.state.period === idx
                    ? GVColors.$positiveColor
                    : GVColors.$labelColor
                }
                strokeWidth={3}
                dot={false}
              />
            ))} */}
          {/* {series.map((s, idx) => (
              <ReferenceArea
                key={idx}
                x1={s.data[0].date}
                x2={s.data[s.data.length - 1].date}
                fillOpacity={0}
                onClick={this.handleClick(idx)}
              />
            ))} */}
          <Bar dataKey="value" fill="#8884d8" isAnimationActive={false} />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </Fragment>
      // <ResponsiveContainer>
      //   <ComposedChart data={chart}>
      //     <XAxis
      //       dataKey="date"
      //       domain={["dataMin", "dataMax"]}
      //       type="number"
      //       axisLine={false}
      //       tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
      //       tickFormatter={(date, i) => {
      //         var t = moment(date).format("ll");
      //         return t;
      //       }}
      //     />
      //     <YAxis
      //       axisLine={false}
      //       tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
      //       width={20}
      //     />

      //     <Tooltip cursor={false} />

      //     {periods.map((x, i) => (
      //       <Area
      //         type="monotone"
      //         dataKey={`${periods[i].value}`}
      //         stroke={GVColors.$primaryColor}
      //         // fill={`url(#dashboardPortfolioChartFill)`}
      //         connectNulls={true}
      //         isAnimationActive={false}
      //         strokeWidth={2}
      //       />
      //     ))}
      //   </ComposedChart>
      // </ResponsiveContainer>
    );
  }
}

export default ProgramProfitChart;
