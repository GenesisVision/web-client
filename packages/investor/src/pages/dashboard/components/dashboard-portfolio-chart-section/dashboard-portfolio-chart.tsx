import * as React from "react";
import { useCallback, useState } from "react";
import {
  Area,
  Bar,
  Cell,
  ComposedChart,
  RechartsFunction,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import chartXAxis from "shared/components/chart/chart-components/chart-xaxis";
import {
  ChartGradient,
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";
import GVColors from "shared/components/gv-styles/gv-colors";
import withLoader from "shared/decorators/with-loader";

import { BAR_COLORS } from "./dashboard-chart.constants";
import DashboardPortfolioTooltip from "./dashboard-portfoio-tooltip";

const _DashboardPortfolioChart: React.FC<Props> = ({ balance, assets }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const assetsCount = 10;
  const grOffset = gradientOffset(
    balance.filter(x => x.value !== undefined).map(x => x.value)
  );
  const handleBarMouseOver: RechartsFunction = useCallback(
    (data, index) => setActiveIndex(index),
    []
  );
  return (
    <ResponsiveContainer>
      <ComposedChart stackOffset="sign" data={assets} margin={{ top: 20 }}>
        <defs>
          <ChartGradient
            offset={grOffset}
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
        {/*
        //@ts-ignore*/}
        <YAxis
          dataKey="balance"
          data={assets}
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(2)}
          unit="GVT"
          width={50}
        />
        {/*
        //@ts-ignore*/}
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
        <Tooltip cursor={false} content={DashboardPortfolioTooltip} />
        {[...Array(assetsCount).keys()].map(idx => (
          <Bar
            dataKey={`asset${assetsCount - idx - 1}.value`}
            data={assets}
            stackId="bars"
            barSize={15}
            onMouseOver={handleBarMouseOver}
            key={idx}
            isAnimationActive={false}
          >
            {assets.map((entry: any, index: number) => (
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
};

interface Props {
  balance: any[];
  assets: any;
}

const DashboardPortfolioChart = withLoader(
  React.memo(_DashboardPortfolioChart)
);
export default DashboardPortfolioChart;
