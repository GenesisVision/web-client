import { getLabelPeriod } from "components/chart/chart-period/chart-period.helpers";
import React from "react";
import { roundPercents } from "utils/formatter";

import Chart from "./components/banner-chart";
import { GvLogoSmall } from "./components/gv-logo";
import LogoPlaceholder from "./components/logo-placeholder";
import Text from "./components/text";
import { BannerComponent, formatEquity, LogoOptions } from "./utils";

type Position = { y: number; x: number };

const Label: React.FC<Position> = ({ children, y, x }) => {
  return (
    <Text x={x} y={y} fontSize={12} color="rgba(255,255,255,0.5)">
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y, x }) => {
  return (
    <Text fontSize={16} color="#fff" position="end" bold x={x} y={y}>
      {children}
    </Text>
  );
};

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize={16} color="#fff" x={95} y={40}>
      {children}
    </Text>
  );
};

export const LOGO_OPTIONS: LogoOptions = {
  useMask: true,
  size: { width: 55, height: 55 },
  position: {
    x: 20,
    y: 20
  }
};

export const Banner: BannerComponent = props => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;

  let title = props.details.publicInfo.title;

  const width = 600;
  const height = 315;

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={width} height={height} fill="#1F2B35" />
      <rect x={width - 140} width={140} height={height} fill="#131E26" />
      <LogoPlaceholder
        {...LOGO_OPTIONS}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GvLogoSmall y={147} x={481} />
      <Title>{title}</Title>
      <Label y={66} x={95}>
        {getLabelPeriod(props.period)} Profit
      </Label>
      <Value y={66} x={255}>
        {roundPercents(statistic.profitPercent)}
      </Value>
      <Label y={66} x={280}>
        Equity
      </Label>
      <Value y={66} x={440}>
        {`$ ${formatEquity(statistic.balance)}`}
      </Value>
      <Chart data={points.chart} width={420} height={200} x={20} y={95} />
    </svg>
  );
};
