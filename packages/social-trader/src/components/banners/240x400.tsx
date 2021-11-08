import React from "react";
import { roundPercents } from "utils/formatter";

import BannerChart from "./components/banner-chart";
import { GvLogoSmall } from "./components/gv-logo";
import LogoPlaceholder from "./components/logo-placeholder";
import Text from "./components/text";
import { BannerComponent, formatEquity, LogoOptions } from "./utils";

type Position = { y: number };

export const LOGO_OPTIONS: LogoOptions = {
  useMask: true,
  size: { width: 25, height: 25 },
  position: {
    x: 20,
    y: 25
  }
};

const Title: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={14} x={20} y={y} color="rgba(255,255,255,0.5)">
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text x={220} y={y} fontSize={16} color="#fff" position="end" bold>
      {children}
    </Text>
  );
};

const Label: React.FC = ({ children }) => {
  return (
    <Text fontSize={14} color="#fff" x={56} y={42}>
      {children}
    </Text>
  );
};

export const Banner: BannerComponent = props => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;
  const chartProps = {
    data: points.chart,
    width: 200,
    height: 165,
    x: 20,
    y: 152
  };
  return (
    <svg
      width={240}
      height={400}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={240} height={400} fill="#1F2B35" />
      <rect y={337} width={240} height={63} fill="#131E26" />
      <LogoPlaceholder
        {...LOGO_OPTIONS}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GvLogoSmall y={359} x={69} />
      <Label>{props.details.publicInfo.title}</Label>
      <Title y={92}>Monthly Profit</Title>
      <Value y={92}>{roundPercents(statistic.profitPercent)}</Value>
      <Title y={122}>Equity</Title>
      <Value y={122}>{`$ ${formatEquity(statistic.balance)}`}</Value>
      <BannerChart {...chartProps} />
    </svg>
  );
};
