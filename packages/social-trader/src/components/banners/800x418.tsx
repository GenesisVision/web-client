import React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatPercent } from "utils/formatter";
import { $negativeColor, $positiveColor } from "utils/style/colors";

import Chart from "./components/banner-chart";
import { GvLogoBig } from "./components/gv-logo";
import LogoPlaceholder from "./components/logo-placeholder";
import Text from "./components/text";
import {
  BannerComponent,
  BannerProps,
  formatEquity,
  LogoOptions
} from "./utils";

type Position = { y: number };
type PercentValueType = { value: number };

const Label: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={20} color={"rgba(255,255,255,0.5)"} x={67} y={y}>
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={26} x={733} y={y} color="#fff" position="end" bold>
      {children}
    </Text>
  );
};

const PercentValue: React.FC<PercentValueType> = ({ children, value }) => {
  const color =
    value > 0 ? $positiveColor : value < 0 ? $negativeColor : "#fff";
  return (
    <Text fontSize={26} x={733} y={147} color={color} position="end" bold>
      {children}
    </Text>
  );
};

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize={20} color="#fff" x={150} y={60} bold>
      {children}
    </Text>
  );
};

export const LOGO_OPTIONS: LogoOptions = {
  useMask: true,
  position: {
    x: 67,
    y: 25
  },
  size: { width: 55, height: 55 }
};

export const Banner: BannerComponent = (props: BannerProps) => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;
  const profit = props.absoluteChart.profit;

  // @ts-ignore
  // @ts-ignore
  return (
    <svg
      width="800"
      height="418"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={800} height={348} fill="#1F2B35" />
      <rect y={348} width={800} height={70} fill="#131E26" />
      <LogoPlaceholder
        {...LOGO_OPTIONS}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GvLogoBig x={316} y={364} />
      <Title>{props.details.publicInfo.title}</Title>
      <Label y={115}>Monthly Profit</Label>
      <Value y={115}>
        <NumberFormat
          value={formatCurrencyValue(profit, "USD")}
          thousandSeparator=" "
          displayType="text"
          prefix={`$ `}
          renderText={(value: string) => <tspan>{value}</tspan>}
        />
      </Value>
      <Label y={147}>Monthly Profit, %</Label>
      <PercentValue value={+formatPercent(statistic.profitPercent)}>
        {formatPercent(statistic.profitPercent)}%
      </PercentValue>
      <Label y={180}>Equity</Label>
      <Value y={180}>
        <NumberFormat
          value={formatEquity(statistic.balance)}
          thousandSeparator=" "
          displayType="text"
          prefix={`$ `}
          renderText={(value: string) => <tspan>{value}</tspan>}
        />
      </Value>
      <Chart data={points.chart} width={666} height={140} x={67} y={198} />
    </svg>
  );
};
