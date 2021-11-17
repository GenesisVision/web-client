import React from "react";
import { roundPercents } from "utils/formatter";

import Chart from "./components/banner-chart";
import { GvLogoSmall } from "./components/gv-logo";
import LogoPlaceholder from "./components/logo-placeholder";
import Text from "./components/text";
import { BannerComponent, formatEquity, LogoOptions } from "./utils";

type Position = { y: number };

const Label: React.FC<Position> = ({ children, y }) => {
  return (
    <Text x={138} y={y} fontSize={12} color="rgba(255,255,255,0.5)">
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={16} color="#fff" position="end" bold x={300} y={y}>
      {children}
    </Text>
  );
};

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize={14} color="#fff" x={25} y={66}>
      {children}
    </Text>
  );
};

export const LOGO_OPTIONS: LogoOptions = {
  useMask: true,
  size: { width: 25, height: 25 },
  position: {
    x: 25,
    y: 19
  }
};

export const Banner: BannerComponent = props => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;

  let title = props.details.publicInfo.title;
  if (title.length > 10) {
    title = title.slice(0, 10) + "...";
  }

  return (
    <svg
      width={728}
      height={89}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={728} height={89} fill="#1F2B35" />
      <rect x={588} width={140} height={89} fill="#131E26" />
      <LogoPlaceholder
        {...LOGO_OPTIONS}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GvLogoSmall y={35} x={611} />
      <Title>{title}</Title>
      <Label y={39}>Monthly Profit</Label>
      <Value y={39}>{roundPercents(statistic.profitPercent)}</Value>
      <Label y={66}>Equity</Label>
      <Value y={66}>{`$ ${formatEquity(statistic.balance)}`}</Value>
      <Chart data={points.chart} width={259} height={66} x={329} y={12} />
    </svg>
  );
};
