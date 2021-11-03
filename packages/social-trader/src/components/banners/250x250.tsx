import React from "react";
import { roundPercents } from "utils/formatter";

import Chart from "./components/banner-chart";
import { GvLogoSmall } from "./components/gv-logo";
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
    <Text fontSize={12} color={"rgba(255,255,255,0.5)"} x={20} y={y}>
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={16} x={230} y={y} color="#fff" position="end" bold>
      {children}
    </Text>
  );
};

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize={12} color="#fff" x={51} y={31}>
      {children}
    </Text>
  );
};

export const LOGO_OPTIONS: LogoOptions = {
  useMask: true,
  position: {
    x: 20,
    y: 16
  },
  size: { width: 21, height: 21 }
};

export const Banner: BannerComponent = (props: BannerProps) => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;

  return (
    <svg
      width="250"
      height="250"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={250} height={205} fill="#1F2B35" />
      <rect y={205} width={250} height={45} fill="#131E26" />
      <LogoPlaceholder
        {...LOGO_OPTIONS}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GvLogoSmall x={77} y={219} />
      <Title>{props.details.publicInfo.title}</Title>
      <Label y={62}>Monthly Profit</Label>
      <Value y={62}>{roundPercents(statistic.profitPercent)}</Value>
      <Label y={87}>Equity</Label>
      <Value y={87}>{`$ ${formatEquity(statistic.balance)}`}</Value>
      <Chart data={points.chart} width={210} height={82} x={20} y={108} />
    </svg>
  );
};
