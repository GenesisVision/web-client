import chartXAxis from "components/chart/chart-components/chart-xaxis";
import { ChartDataType } from "components/details/details-statistic-section/details.chart.types";
import GVColors from "components/gv-styles/gv-colors";
import ProgramAbsoluteProfitTooltip from "pages/programs/program-details/program-details-statistic-section/program-details-chart-section/program-absolute-profit-chart-section/program-absolute-profit-tooltip";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import { CurrencyEnum } from "utils/types";

const _ProgramAbsoluteProfitChart: React.FC<Props> = ({
  chart,
  currency,
  color
}) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={chart} margin={{ top: 20 }}>
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
            patternTransform="scale(2 2) rotate(30)"
          >
            <path
              d="M0,0 l0,4"
              stroke={GVColors.$negativeColor}
              strokeWidth={2}
            />
          </pattern>
        </defs>
        {chartXAxis(chart[0].date, chart[chart.length - 1].date)}
        <YAxis
          axisLine={false}
          orientation="right"
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(4)}
          unit={currency}
          width={60}
        />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <Area
          dataKey="managerFunds"
          type="monotone"
          fill={`${color}2a`}
          stroke={`${color}2a`}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="investorsFunds"
          type="monotone"
          fill={color}
          stroke={color}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="profit"
          type="monotone"
          fill={`${color}2a`}
          stroke={`${color}2a`}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="profitNegative"
          type="monotone"
          fill="url(#diagonalHatch)"
          stroke={color}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Tooltip content={ProgramAbsoluteProfitTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface Props {
  color: string;
  chart: ChartDataType;
  currency: CurrencyEnum;
}

const ProgramAbsoluteProfitChart = React.memo(_ProgramAbsoluteProfitChart);
export default ProgramAbsoluteProfitChart;
