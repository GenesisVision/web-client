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
    <Text fontSize={24} color={"rgba(255,255,255,0.5)"} x={50} y={y}>
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={32} x={550} y={y} color="#fff" position="end" bold>
      {children}
    </Text>
  );
};

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize={24} color="#fff" x={122} y={75} bold>
      {children}
    </Text>
  );
};

export const LOGO_OPTIONS: LogoOptions = {
  useMask: true,
  position: {
    x: 48,
    y: 38
  },
  size: { width: 50, height: 50 }
};

export const Banner: BannerComponent = (props: BannerProps) => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;
  const profit = props.absoluteChart.profit;

  return (
    <svg
      width="600"
      height="600"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={600} height={500} fill="#1F2B35" />
      <rect y={500} width={600} height={100} fill="#131E26" />
      <LogoPlaceholder
        {...LOGO_OPTIONS}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GvLogoBig x={216} y={531} />
      <Title>{props.details.publicInfo.title}</Title>
      <Label y={130}>Monthly Profit</Label>
      <Value y={130}>{`$ ${formatCurrencyValue(profit, "USD")}`}</Value>
      <Label y={180}>Monthly Profit, %</Label>
      <Value y={180}>{`${formatPercent(statistic.profitPercent)}%`}</Value>
      <Label y={230}>Equity</Label>
      <Value y={230}>{formatEquity(statistic.balance)}</Value>
      <Chart data={points.chart} width={500} height={200} x={50} y={260} />
    </svg>
  );
};
