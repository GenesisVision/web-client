import React from "react";
import { formatCurrencyValue, formatPercent } from "utils/formatter";

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
      <Value y={115}>{`$ ${formatCurrencyValue(profit, "USD")}`}</Value>
      <Label y={147}>Monthly Profit, %</Label>
      <Value y={147}>{`${formatPercent(statistic.profitPercent)}%`}</Value>
      <Label y={180}>Equity</Label>
      <Value y={180}>{formatEquity(statistic.balance)}</Value>
      <Chart data={points.chart} width={666} height={140} x={67} y={198} />
    </svg>
  );
};
