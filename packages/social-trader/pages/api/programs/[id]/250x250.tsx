import GV from "components/banners/GV";
import Logo from "components/banners/Logo";
import Text from "components/banners/Text";
import SimpleChart from "components/chart/simple-chart";
import React from "react";
import createBannerApi, { BannerComponent } from "components/banners/utils";

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

const Banner: BannerComponent = props => {
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
      <Logo
        x={20}
        y={16}
        size={21}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.color}
      />
      <GV x={77} y={219} />
      <Title>{props.details.publicInfo.title}</Title>
      <Label y={62}>Monthly Profit</Label>
      <Value y={62}>{`${statistic.profitPercent}%`}</Value>
      <Label y={87}>Equity</Label>
      <Value y={87}>{`${points.currency}${statistic.balance}`}</Value>
      <SimpleChart data={points.chart} width={210} height={82} x={20} y={108} />
    </svg>
  );
};

export default createBannerApi(Banner);
